"use client"
import html2canvas from "html2canvas";

export const generateImage = async (cardRef) => {
    const card = cardRef.current;

    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.top = "-9999px";
    container.style.width = "1080px";
    container.style.height = "1080px";
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.backgroundImage = "url(/background.png)";
    container.style.backgroundSize = "cover";

    const cardClone = card.cloneNode(true);
    cardClone.style.width = "384px";
    cardClone.style.height = "384px";
    cardClone.style.transform = "scale(2.5)";

    // Hide the footer in the cloned card so it doesn't appear in the image
    if (cardClone.lastElementChild) {
        cardClone.lastElementChild.style.display = "none";
    }

    // Find the main confession text element
    const confessionTextElement = cardClone.querySelector(".break-words");
    if (confessionTextElement) {
        // Remove responsive text classes to ensure consistent font size
        confessionTextElement.classList.remove("text-sm", "md:text-xl", "lg:text-2xl");
        // Set a fixed font size. 24px is equivalent to Tailwind's text-2xl.
        confessionTextElement.style.fontSize = "24px";
    }

    container.appendChild(cardClone);
    document.body.appendChild(container);

    const canvas = await html2canvas(container, {
        logging: true,
        useCORS: true,
        width: 1080,
        height: 1080,
    });

    document.body.removeChild(container);
    return canvas;
};