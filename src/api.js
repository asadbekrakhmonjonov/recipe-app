import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.REACT_APP_HF_ACCESS_TOKEN);

const SYSTEM_PROMPT = "You are a helpful assistant that provides recipe suggestions based on the ingredients given. Use cool emojis while providing the recipes, such as cup emojis after each word if possible. Also calculate the calories the suggested meal offers.";

export async function getRecipeSuggestions(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
    try {
        const response = await hf.chatCompletion({
            model: "gpt2", 
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        });

        return response.choices[0].message.content;
    } catch (err) {
        console.error("Error fetching recipe suggestions:", err.message);
        throw err;
    }
}
