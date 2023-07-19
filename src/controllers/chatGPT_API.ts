import { Configuration, OpenAIApi } from "openai";

const {chatgpt} = require('../../config.json');

export class ChatGPT_API
{
    configuration:Configuration = new Configuration({
        apiKey: chatgpt
      });
      openai:OpenAIApi = new OpenAIApi(this.configuration);
    
      public async sendOpenAIRequest(prompt: string): Promise<string> 
      {     
        try 
        {
          const response = await this.openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content: prompt}]
          });
    
          return response.data.choices[0].message?.content || 'Something went wrong';
        } 
        catch (error) 
        {
            return 'Something went wrong';
        }
      }
}
