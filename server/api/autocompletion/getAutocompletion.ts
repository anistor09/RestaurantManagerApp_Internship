export default defineEventHandler((event) => {
	
	return readBody(event).then(async (data) => {

        const url = 'https://api.openai.com/v1/chat/completions';
        const apiKey = process.env.OPENAI_API_KEY // Replace with your actual API key
      
        const headers = {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        };
        let target = ''
        if(data.forItem)
            target = 'an item'
        else
            target = 'a category'  
        const prompt = `Please give me a description of around ${data.length} characters for ${target} named ${data.itemName}, which is part of a restaurant menu.`
        const sentdata = {
          'model': 'gpt-3.5-turbo',  
          "messages": [{"role": "user", "content": prompt}],
          "temperature": 0.7,
          'max_tokens': 50, // Adjust the number of tokens as per your requirement
        };
      
        const requestOptions = {
          method: 'POST',
          headers,
          body: JSON.stringify(sentdata),
        };
      
        try {
          const response = await fetch(url, requestOptions);
          const responseData = await response.json();
        //   console.log(responseData.choices[0].message.content)
          return responseData.choices[0].message.content
          
        } catch (error) {
          console.error('Error:', error);
        }
      
		
	});
});
