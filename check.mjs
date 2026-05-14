import * as icons from '@lobehub/icons';
console.log(Object.keys(icons).filter(k => k.match(/Llama|Falcon|Grok|Qwen|Alibaba|OpenAI|Claude|Google|Meta|Mistral|DeepSeek|Cohere|Perplexity|Microsoft|TII/i)).join(', '));
