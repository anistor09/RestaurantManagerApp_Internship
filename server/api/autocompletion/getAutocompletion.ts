export default defineEventHandler((event) => {
	
	return readBody(event).then(async (data) => {

        const url = 'https://api.openai.com/v1/chat/completions';
        const apiKey = process.env.OPENAI_API_KEY // Replace with your actual API key
      
        const headers = {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        };
        let prompt = ""
        const basicPrompt = `Please give me a description of around ${data.length} characters for`
        if(data.target === 'a category' || data.target === 'an item')
           prompt = basicPrompt +  ` ${data.target} named ${data.itemName}, which is part of a restaurant menu. Please make sure each sentence is coherent and is finished.`;
        if(data.target === 'restaurant')  
          prompt =  basicPrompt +  ` a restaurant named ${data.itemName}. The description will be used in the restaurant's menu. Please make sure each sentence is coherent and is finished.`;
        if(data.target === 'menu')  
          prompt =  basicPrompt +  ` a menu named ${data.itemName}. Please make sure each sentence is coherent and is finished.`;  
       
        const sentdata = {
          'model': 'gpt-3.5-turbo',  
          "messages": [{"role": "user", "content": prompt}],
          "temperature": 1.0,
          'max_tokens': 300, // Adjust the number of tokens as per your requirement
        };
       
        const requestOptions = {
          method: 'POST',
          headers,
          body: JSON.stringify(sentdata),
        };
      
        try {
          const response = await fetch(url, requestOptions);
          if (response.status === 429) {
            return 'The server is overloaded. Please try again in a few minutes.';
          }
          
          const responseData = await response.json();
          
          return responseData.choices[0].message.content
          
        } catch (error) {
          console.error('Error:', error);
        }
      
		
	});
});
