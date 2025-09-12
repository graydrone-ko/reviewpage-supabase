import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';
import { supabaseAdmin } from '../src/lib/supabase';
import { dbUtils } from '../src/utils/database';

dotenv.config();

async function createAdmin() {
  try {
    console.log('🔍 기존 관리자 계정 확인 중...');
    
    // 기존 관리자 계정 확인
    const existingAdmin = await dbUtils.findUserByEmail('admin@reviewpage.com');

    if (existingAdmin) {
      console.log('⚠️ 관리자 계정이 이미 존재합니다:', existingAdmin.email);
      console.log('기존 계정 정보:', {
        name: existingAdmin.name,
        role: existingAdmin.role,
        created_at: existingAdmin.created_at
      });
      return;
    }

    console.log('🔐 비밀번호 해시 생성 중...');
    // 요청받은 비밀번호로 해시 생성
    const hashedPassword = await bcrypt.hash('7300gray', 10);
    
    console.log('👤 관리자 계정 생성 중...');
    
    const { data: admin, error } = await supabaseAdmin
      .from('users')
      .insert([{
        email: 'admin@reviewpage.com',
        password: hashedPassword,
        name: '시스템 관리자',
        role: 'ADMIN',
        gender: 'MALE',
        birth_date: '1990-01-01',
        phone_number: '010-1234-5678',
        account_number: '123456789012',
        bank_code: '004' // KB국민은행
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    console.log('✅ 관리자 계정이 성공적으로 생성되었습니다!');
    console.log('📧 이메일:', admin.email);
    console.log('🔑 비밀번호: 7300gray');
    console.log('👤 이름:', admin.name);
    console.log('🛡️ 역할:', admin.role);
    console.log('🆔 사용자 ID:', admin.id);

  } catch (error: any) {
    console.error('❌ 관리자 계정 생성 중 오류 발생:', error.message);
    if (error.details) {
      console.error('세부사항:', error.details);
    }
  }
}

createAdmin();