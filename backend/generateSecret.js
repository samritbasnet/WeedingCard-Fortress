const crypto = require('crypto');

// 비밀 키 생성
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString('hex');
  console.log(`Generated JWT_SECRET: ${secretKey}`);
};

generateSecretKey();
