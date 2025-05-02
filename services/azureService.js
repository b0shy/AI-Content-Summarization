const { AzureKeyCredential, TextAnalysisClient } = require("@azure/ai-language-text");

const endpoint = process.env.AZURE_ENDPOINT;
const apiKey = process.env.AZURE_KEY;

const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

exports.getSummaryFromText = async (text) => {
  const documents = [text];

  const actions = [
    {
      kind: "ExtractiveSummarization",
      maxSentenceCount: 3,
    },
  ];

  try {
    const poller = await client.beginAnalyzeBatch(actions, documents, "en");
    const results = await poller.pollUntilDone();

    for await (const actionResult of results) {
      if (actionResult.kind !== "ExtractiveSummarization") {
        throw new Error(`Expected extractive summarization results but got: ${actionResult.kind}`);
      }

      if (actionResult.error) {
        const { code, message } = actionResult.error;
        throw new Error(`Azure Error (${code}): ${message}`);
      }

      for (const result of actionResult.results) {
        if (result.error) {
          const { code, message } = result.error;
          throw new Error(`Document Error (${code}): ${message}`);
        }

        return result.sentences.map((s) => s.text).join(" ");
      }
    }

    throw new Error("No results returned from Azure.");
  } catch (err) {
    console.error("Azure SDK Error:", err);
    throw new Error("Azure Summarization failed");
  }
};
