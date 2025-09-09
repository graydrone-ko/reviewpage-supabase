const crypto = require('crypto');

function generateSecureJWTSecret() {
  // Generate a cryptographically secure random string
  const secret = crypto.randomBytes(64).toString('hex');
  
  console.log('🔐 새로운 JWT Secret 생성됨:');
  console.log('━'.repeat(80));
  console.log(secret);
  console.log('━'.repeat(80));
  console.log('\n📋 배포 시 환경변수 설정:');
  console.log(`JWT_SECRET=${secret}`);
  console.log('\n⚠️  이 시크릿은 절대 코드에 커밋하지 마세요!');
  console.log('   Railway 환경변수 설정에서만 사용하세요.');
  
  return secret;
}

if (require.main === module) {
  generateSecureJWTSecret();
}

module.exports = { generateSecureJWTSecret };