const crypto = require('crypto');

export function generateAccountToken() {

  const randomString = crypto.randomBytes(32).toString('hex');
  
  
  const rawToken = `tuv_${randomString}`;
  
 
  const prefix = rawToken.substring(0, 8); // مثلا tuv_9b3f

 
  return {
    rawToken, 
    
    prefix      
  };
}

