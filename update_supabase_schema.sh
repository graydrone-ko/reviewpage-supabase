#!/bin/bash

# Supabase 스키마 업데이트 스크립트
# 익명 사용자 응답 허용을 위한 마이그레이션

echo "🔄 Supabase 스키마 업데이트 시작..."

# Supabase CLI가 설치되어 있는지 확인
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI가 설치되어 있지 않습니다."
    echo "설치 방법: npm install -g supabase"
    exit 1
fi

# 마이그레이션 파일 실행
echo "📝 익명 사용자 응답 허용 마이그레이션 적용 중..."

if [ -f "supabase/migrations/fix_anonymous_responses.sql" ]; then
    # Supabase 프로젝트에 마이그레이션 적용
    supabase db push
    
    if [ $? -eq 0 ]; then
        echo "✅ 스키마 업데이트 완료!"
        echo "📋 변경사항:"
        echo "   - consumer_id 컬럼을 NULL 허용으로 변경"
        echo "   - 익명 사용자 중복 응답 허용"
        echo "   - 로그인 사용자는 여전히 중복 응답 방지"
    else
        echo "❌ 마이그레이션 적용 실패"
        exit 1
    fi
else
    echo "❌ 마이그레이션 파일을 찾을 수 없습니다: supabase/migrations/fix_anonymous_responses.sql"
    exit 1
fi

echo "🎉 Supabase 스키마 업데이트 완료!"