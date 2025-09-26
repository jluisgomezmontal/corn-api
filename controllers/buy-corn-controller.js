
export const buyCorn = async (req, res) => {
    const clientIp = req.ip;
    const currentTime = Date.now();
    const lastRequestTime = clientRequestLog[clientIp];

    console.log(`Request from IP: ${clientIp}`);

    // Check if the client has made a request within the last minute.
    if (lastRequestTime && (currentTime - lastRequestTime < RATE_LIMIT_WINDOW_MS)) {
        const timeWaited = Math.round((currentTime - lastRequestTime) / 1000);
        const timeLeft = 60 - timeWaited;
        console.log(`Rate limit exceeded for ${clientIp}. Please wait ${timeLeft} more seconds.`);

        // Return "429 Too Many Requests"
        res.status(429).send(`You are buying corn too fast! Please wait ${timeLeft} more seconds.`);
        return;
    }

    // If the client is not rate-limited, log their request time and send success.
    clientRequestLog[clientIp] = currentTime;
    console.log(`Success! Corn sold to ${clientIp}`);

    // Return "200 OK" with a corn emoji.
    res.status(200).send('🌽');
};
