export default function DenialPayphoneContent() {
    return (
        <div>
            <h1 className="text-3xl">Overview</h1>
            <p>
                On June 30th, my collaborator Laila called me with an idea for an interactive payphone,
                ominously installed underneath a billboard.
            </p>

            <img
                src="/images/installation/content/denial-payphone/denial_payphone_original_idea.png"
                alt="Original Idea"
                style={{ width: '100%', maxWidth: '600px', margin: '20px 0' }}
            />

            <h2>How It Works</h2>
            <ol>
                <li><strong>Phone Call</strong>: Users dial the number and are connected to the payphone</li>
                <li><strong>Keyword Detection</strong>: The Raspberry Pi listens for specific keywords using Vosk</li>
                <li><strong>Sentiment Analysis</strong>: Python scripts analyze the emotional content of conversations</li>
                <li><strong>Billboard Response</strong>: The system triggers responses based on detected patterns</li>
            </ol>

            <h2>Technical Implementation</h2>

            <h3>Hardware Setup</h3>
            <ul>
                <li><strong>Raspberry Pi 4</strong>: Main processing unit for audio analysis</li>
                <li><strong>USB Audio Interface</strong>: High-quality audio input/output</li>
                <li><strong>Cellular Modem</strong>: Connects the payphone to the phone network</li>
                <li><strong>Weather Protection</strong>: Enclosure rated for outdoor installation</li>
            </ul>

            <h3>Software Architecture</h3>
            <ul>
                <li><strong>Vosk Speech Recognition</strong>: Real-time speech-to-text processing</li>
                <li><strong>Python Audio Processing</strong>: Custom scripts for keyword detection</li>
                <li><strong>Sentiment Analysis</strong>: Natural language processing for emotional context</li>
                <li><strong>Data Logging</strong>: Secure storage of interaction patterns (anonymized)</li>
            </ul>

            <h2>Installation Process</h2>
            <p>
                The payphone was strategically placed in Echo Park, Los Angeles, underneath a billboard
                to create an ominous and thought-provoking presence. The installation required:
            </p>
            <ul>
                <li>Permits for public art installation</li>
                <li>Coordination with billboard advertising company</li>
                <li>Weatherproofing and security measures</li>
                <li>Network connectivity setup</li>
            </ul>

            <h2>Billboard Campaign</h2>
            <p>
                15 billboards across Los Angeles were purchased to direct people to the payphone location,
                creating a city-wide interactive art experience that blurred the lines between digital
                and physical space.
            </p>

            <h2>Impact</h2>
            <p>
                The Denial Payphone created a unique intersection of technology, public art, and social
                commentary. By analyzing conversations for keywords and sentiment, it raised questions
                about privacy, surveillance, and the emotional landscape of urban communication.
            </p>
        </div>
    );
}