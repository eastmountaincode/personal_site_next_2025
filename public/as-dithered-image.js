// Prevent duplicate loading of the entire script
if (typeof window.ASDitheredImageLoaded === 'undefined') {
    window.ASDitheredImageLoaded = true;

    const DITHERED_IMAGE_STYLE = `
.ditheredImageStyle {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    image-rendering: crisp-edges;
}
`;

    const workerPath = document.currentScript.src.replace("as-dithered-image.js", "ditherworker.js");

class ASDitheredImage extends HTMLElement {
    constructor() {
        super()

        this.original_image_ = undefined
        this.force_refresh_ = false
        this.crunchFactor_ = this.getAutoCrunchFactor()
        this.canvas_ = undefined
        this.context_ = undefined
        this.image_loading_ = false
        this.ignore_next_resize_ = false
        this.worker_ = new Worker(workerPath)
        this.cutoff_ = 0.5
        this.darkrgba_ = [0, 0, 0, 255]
        this.lightrgba_ = [255, 255, 255, 255]

        this.worker_.onmessage = ((e) => {
            const imageData = e.data.imageData
            this.context_.putImageData(imageData, 0, 0)
        }).bind(this)

        this.resizing_timeout_ = undefined

        this.last_draw_state_ = { width: 0, height: 0, crunchFactor: 0, imageSrc: "" }
    }

    connectedCallback() {
        if (!this.isConnected) {
            return
        }

        const shadowDOM = this.attachShadow({ mode: "open" })

        const style = document.createElement("style")
        style.innerHTML = DITHERED_IMAGE_STYLE
        shadowDOM.appendChild(style)

        this.canvas_ = document.createElement("canvas")
        this.canvas_.setAttribute("role", "image")
        this.canvas_.setAttribute("aria-label", this.getAttribute("alt"))
        this.canvas_.classList.add("ditheredImageStyle")
        shadowDOM.appendChild(this.canvas_)

        this.context_ = this.canvas_.getContext("2d", { willReadFrequently: true })

        const resizeObserver = new ResizeObserver(((entries) => {
            if (entries.length > 0) {
                if (entries[0].contentBoxSize) {

                    if (this.ignore_next_resize_ == true) {
                        this.ignore_next_resize_ = false
                        return
                    }
                    if (this.resizing_timeout_ != undefined) {
                        clearTimeout(this.resizing_timeout_)
                    }
                    this.resizing_timeout_ = setTimeout((() => {
                        this.resizing_timeout_ = undefined
                        this.force_refresh_ = true
                        this.requestUpdate()
                    }).bind(this), 200)
                }

            }
        }).bind(this))

        resizeObserver.observe(this.canvas_)

        const intersectionObserver = new IntersectionObserver(((intersections) => {
            if (intersections.length > 0) {
                if (intersections[0].isIntersecting) {
                    this.force_refresh_ = true
                    this.requestUpdate()
                }
            }
        }).bind(this), { root: null, rootMargin: "1000px", threshold: [0] })
        intersectionObserver.observe(this)

        this.force_refresh_ = true
        this.requestUpdate()
    }

    static get observedAttributes() { return ["src", "crunch", "alt", "cutoff", "darkrgba", "lightrgba"] }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return

        if ((name === "src")) {
            this.force_refresh_ = true
            this.original_image_ = undefined
            this.requestUpdate()
        } else if (name === "crunch") {
            if (newValue === "auto") {
                this.crunchFactor_ = this.getAutoCrunchFactor()
            } else if (newValue === "pixel") {
                this.crunchFactor_ = 1.0 / this.getDevicePixelRatio()
            } else {
                this.crunchFactor_ = parseInt(newValue, 10)
                if (isNaN(this.crunchFactor_)) {
                    this.crunchFactor_ = this.getAutoCrunchFactor()
                }
            }
            this.force_refresh_ = true
            this.requestUpdate()
        } else if (name === "alt") {
            this.altText = newValue;
            if (this.canvas != undefined) {
                let currentAltText = this.canvas.getAttribute("aria-label")
                if (currentAltText != newValue) {
                    this.canvas.setAttribute("aria-label", newValue)
                }
            }
        } else if (name === "cutoff") {
            this.cutoff_ = parseFloat(newValue)
            if (isNaN(this.cutoff_)) {
                this.cutoff_ = 0.5
            }
            this.cutoff_ = Math.min(1.0, Math.max(0.0, this.cutoff_))
            this.force_refresh_ = true
            this.requestUpdate()
        } else if (name === "darkrgba") {
            this.darkrgba_ = this.parseRGBA(newValue)
            this.force_refresh_ = true
            this.requestUpdate()
        }
        else if (name === "lightrgba") {
            this.lightrgba_ = this.parseRGBA(newValue)
            this.force_refresh_ = true
            this.requestUpdate()
        }
    }

    getAutoCrunchFactor() {
        if (this.getDevicePixelRatio() < 3) {
            return 1
        } else {
            return 2
        }
    }

    getDevicePixelRatio() {
        return window.devicePixelRatio
    }

    isInOrNearViewport() {
        const margin = 1500
        const r = this.getBoundingClientRect()

        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
        const above = r.bottom + margin < 0
        const below = r.top - margin > viewHeight

        return (!above && !below)
    }

    requestUpdate() {
        if (this.original_image_ != undefined) {
            if (this.isInOrNearViewport() == false) {
                return
            }
        }

        window.requestAnimationFrame(((timestamp) => {
            if ((this.force_refresh_ == false)) {
                return
            }
            if (this.original_image_ == undefined) {
                this.loadImage()
                return
            }
            if (this.force_refresh_) {
                this.repaintImage()
            }
        }).bind(this))
    }

    loadImage() {
        if (this.image_loading_ == true) {
            return
        }
        this.image_loading_ = true
        const image = new Image()
        image.crossOrigin = "anonymous"
        image.src = this.getAttribute("src")

        image.decode().then((() => {
            this.original_image_ = image
            this.ignore_next_resize_ = true
            this.canvas_.style.aspectRatio = this.original_image_.width + "/" + this.original_image_.height
            this.force_refresh_ = true
            this.requestUpdate()
        }).bind(this))
            .catch(((decodeError) => {
                console.log("Error decoding image: ", decodeError)
                this.original_image_ = undefined
            }).bind(this))
            .finally((() => {
                this.image_loading_ = false
            }).bind(this))
    }

    parseRGBA(s) {
        var matches = s.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\,\s*(\d+)\s*\)$/i);
        if (matches) {
            return [matches[1], matches[2], matches[3], matches[4]]
        }
        else {
            return [255, 255, 255, 255]
        }
    }

    repaintImage() {
        const rect = this.canvas_.getBoundingClientRect()
        let screenPixelsToBackingStorePixels = this.getDevicePixelRatio()
        let fractionalPart = screenPixelsToBackingStorePixels - Math.floor(screenPixelsToBackingStorePixels)

        if (this.getAttribute("crunch") == "pixel") {
            this.crunchFactor_ = 1.0 / this.getDevicePixelRatio()
        }

        if ((1.0 / fractionalPart) > 3) {
            fractionalPart = 0
            screenPixelsToBackingStorePixels = Math.round(screenPixelsToBackingStorePixels)
        }
        if (fractionalPart != 0) {
            screenPixelsToBackingStorePixels = Math.round(screenPixelsToBackingStorePixels * Math.round(1.0 / fractionalPart))
        }

        const calculatedWidth = Math.round(rect.width * screenPixelsToBackingStorePixels)
        const calculatedHeight = Math.round(rect.height * screenPixelsToBackingStorePixels)
        let adjustedPixelSize = Math.round(screenPixelsToBackingStorePixels * this.crunchFactor_)

        // Safety check: ensure we have valid dimensions
        if (calculatedWidth <= 0 || calculatedHeight <= 0 || adjustedPixelSize <= 0) {
            console.warn("as-dithered-image: Invalid dimensions, skipping render", {
                calculatedWidth,
                calculatedHeight,
                adjustedPixelSize,
                rectWidth: rect.width,
                rectHeight: rect.height
            })
            return
        }

        if ((this.last_draw_state_.width == calculatedWidth) &&
            (this.last_draw_state_.height == calculatedHeight) &&
            (this.last_draw_state_.adjustedPixelSize == adjustedPixelSize) &&
            (this.last_draw_state_.imageSrc == this.original_image_.currentSrc) &&
            (this.last_draw_state_.cutoff == this.cutoff_) &&
            (this.last_draw_state_.darkrgba == this.darkrgba_) &&
            (this.last_draw_state_.lightrgba == this.lightrgba_)
        ) {
            return;
        }

        this.canvas_.width = calculatedWidth
        this.canvas_.height = calculatedHeight

        this.last_draw_state_.width = this.canvas_.width
        this.last_draw_state_.height = this.canvas_.height
        this.last_draw_state_.adjustedPixelSize = adjustedPixelSize
        this.last_draw_state_.imageSrc = this.original_image_.currentSrc
        this.last_draw_state_.cutoff = this.cutoff_
        this.last_draw_state_.darkrgba = this.darkrgba_
        this.last_draw_state_.lightrgba = this.lightrgba_

        this.context_.imageSmoothingEnabled = true
        this.context_.drawImage(this.original_image_, 0, 0, this.canvas_.width / adjustedPixelSize, this.canvas_.height / adjustedPixelSize)
        
        // Safety check before getImageData
        const imageDataWidth = Math.floor(this.canvas_.width / adjustedPixelSize)
        const imageDataHeight = Math.floor(this.canvas_.height / adjustedPixelSize)
        if (imageDataWidth <= 0 || imageDataHeight <= 0) {
            console.warn("as-dithered-image: Invalid image data dimensions", {
                imageDataWidth,
                imageDataHeight,
                canvasWidth: this.canvas_.width,
                canvasHeight: this.canvas_.height,
                adjustedPixelSize
            })
            return
        }
        
        const originalData = this.context_.getImageData(0, 0, imageDataWidth, imageDataHeight)
        this.context_.clearRect(0, 0, this.canvas_.width, this.canvas_.height)

        const msg = {}
        msg.imageData = originalData
        msg.pixelSize = adjustedPixelSize
        msg.cutoff = this.cutoff_
        msg.blackRGBA = this.darkrgba_
        msg.whiteRGBA = this.lightrgba_
        this.worker_.postMessage(msg)

        this.force_refresh_ = false
    }
}

    // Only define the custom element if it hasn't been defined already
    if (!window.customElements.get('as-dithered-image')) {
        window.customElements.define('as-dithered-image', ASDitheredImage);
    }

} // End of ASDitheredImageLoaded check 