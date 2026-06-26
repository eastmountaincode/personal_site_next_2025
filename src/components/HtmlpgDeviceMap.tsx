"use client";

import { useEffect, useRef, useState } from "react";

const DEVICES_ENDPOINT = "/api/htmlpg/devices";

type HtmlpgDevice = {
    id: string;
    name: string;
    city: string;
    address: string;
    lat: number;
    lng: number;
};

export default function HtmlpgDeviceMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [devices, setDevices] = useState<HtmlpgDevice[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadDevices() {
            try {
                const response = await fetch(DEVICES_ENDPOINT, { cache: "no-store" });
                if (!response.ok) {
                    throw new Error(`Device map request failed with ${response.status}`);
                }

                const data: unknown = await response.json();
                const nextDevices = normalizeDevices(data);
                if (!cancelled) {
                    setDevices(nextDevices);
                    setError(null);
                }
            } catch (error) {
                console.error("[HTMLPG] Could not load device locations.", error);
                if (!cancelled) {
                    setDevices([]);
                    setError("Could not load device locations.");
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        }

        loadDevices();
        const intervalId = window.setInterval(loadDevices, 5 * 60 * 1000);

        return () => {
            cancelled = true;
            window.clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        let isMounted = true;
        let map: import("leaflet").Map | undefined;

        async function initMap() {
            if (!mapRef.current || devices.length === 0) return;

            const L = await import("leaflet");
            if (!isMounted || !mapRef.current) return;

            const mapInstance = L.map(mapRef.current, {
                scrollWheelZoom: false,
                zoomControl: true,
            });
            map = mapInstance;

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapInstance);

            const bounds = L.latLngBounds([]);

            devices.forEach((device) => {
                const latLng: [number, number] = [device.lat, device.lng];
                bounds.extend(latLng);

                L.circleMarker(latLng, {
                    radius: 8,
                    color: "#000",
                    weight: 2,
                    fillColor: "#facc15",
                    fillOpacity: 1,
                })
                    .bindPopup(
                        `<strong>${escapeHtml(device.name)}</strong><br />${escapeHtml(device.city)}`
                    )
                    .addTo(mapInstance);
            });

            if (devices.length === 1) {
                mapInstance.setView([devices[0].lat, devices[0].lng], 11);
            } else {
                mapInstance.fitBounds(bounds, {
                    padding: [32, 32],
                    maxZoom: 5,
                });
            }
        }

        initMap();

        return () => {
            isMounted = false;
            map?.remove();
        };
    }, [devices]);

    return (
        <section className="my-8">
            <h2 className="text-2xl font-bold my-6">Where are the devices?</h2>
            <div className="w-full border border-black bg-gray-100 h-80 md:h-96 overflow-hidden">
                {isLoading || error || devices.length === 0 ? (
                    <div className="h-full w-full flex items-center justify-center p-6 text-center text-sm text-gray-600">
                        {isLoading
                            ? "Loading device locations..."
                            : error ?? "No public device locations yet."}
                    </div>
                ) : (
                    <div ref={mapRef} className="h-full w-full" aria-label="HTMLPG device map" />
                )}
            </div>
            {devices.length > 0 && (
                <ul className="mt-4 text-gray-600 space-y-1">
                    {devices.map((device) => (
                        <li key={device.id}>
                            <span className="font-bold">{device.name}</span> — {device.city}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

function normalizeDevices(data: unknown): HtmlpgDevice[] {
    if (!isDevicePayload(data)) {
        throw new Error("Unexpected device map response");
    }

    return data.devices.map((device) => ({
        id: device.id,
        name: device.name,
        city: device.city,
        address: device.address,
        lat: Number(device.lat),
        lng: Number(device.lng),
    }));
}

function isDevicePayload(data: unknown): data is { devices: HtmlpgDevice[] } {
    if (!data || typeof data !== "object" || !("devices" in data)) {
        return false;
    }

    const { devices } = data as { devices: unknown };
    return Array.isArray(devices) && devices.every(isDevice);
}

function isDevice(value: unknown): value is HtmlpgDevice {
    if (!value || typeof value !== "object") {
        return false;
    }

    const device = value as Record<string, unknown>;
    return (
        typeof device.id === "string" &&
        typeof device.name === "string" &&
        typeof device.city === "string" &&
        typeof device.address === "string" &&
        Number.isFinite(Number(device.lat)) &&
        Number.isFinite(Number(device.lng))
    );
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
