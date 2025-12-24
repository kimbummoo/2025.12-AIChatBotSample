
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  // 라우터 객체
  const router = useRouter();
  // 지도 이미지 참조
  const mapRef = useRef<HTMLImageElement>(null);
  // 지도 이미지의 실제 위치와 크기
  const [mapRect, setMapRect] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [relativeSize, setRelativeSize] = useState(1.0);

  // 지도 위에 표시할 동물 버튼 정보 (비율 기반)
  const animals = [
    {
      name: "elephant",
      image: "/animal_elephant.png",
      alt: "코끼리",
      filter: 'drop-shadow(0 0 24px #ffffffff)',
      page: "/elephant-page",
      x: 0.65, // 지도 내 x 비율(0~1)
      y: 0.48, // 지도 내 y 비율(0~1)
      size: 360,
    },
    {
      name: "orca",
      image: "/animal_orca.png",
      alt: "범고래",
      filter: 'drop-shadow(0 0 24px #ffffffff)',
      page: "/orca-page",
      x: 0.34,
      y: 0.5,
      size: 480,
    },
    {
      name: "dolphin",
      image: "/animal_dolphin.png",
      alt: "돌고래",
      filter: 'drop-shadow(0 0 24px #ffffffff)',
      page: "/dolphin-page",
      x: 0.9,
      y: 0.5,
      size: 400,
    },
    {
      name: "crocodile",
      image: "/animal_crocodile.png",
      alt: "악어",
      filter: 'drop-shadow(0 0 24px #ffffffff)',
      page: "/crocodile-page",
      x: 0.55, // 지도 내 x 비율(0~1)
      y: 0.52, // 지도 내 y 비율(0~1)
      size: 400,
    },
  ];

  // body, html의 기본 여백 제거 (전체화면)
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
  }, []);

  // 지도 이미지의 실제 크기(화면에 contain된 사이즈)와 위치를 측정하여 상태로 저장
  useEffect(() => {
    function updateMapRect() {
      const map = mapRef.current;
      if (!map) return;
      const parent = map.parentElement;
      if (!parent) return;
      const parentRect = parent.getBoundingClientRect();
      const imgW = map.naturalWidth;
      const imgH = map.naturalHeight;
      const parentW = parentRect.width;
      const parentH = parentRect.height;
      // contain fit 계산
      const scale = Math.min(parentW / imgW, parentH / imgH);
      const displayW = imgW * scale;
      const displayH = imgH * scale;
      const left = (parentW - displayW) / 2;
      const top = (parentH - displayH) / 2;
      setMapRect({ left, top, width: displayW, height: displayH });
      setRelativeSize(scale);
    }
    updateMapRect();
    window.addEventListener('resize', updateMapRect);
    return () => window.removeEventListener('resize', updateMapRect);
  }, []);

  // 이미지가 로드될 때도 rect 갱신
  function handleImgLoad() {
    setTimeout(() => {
      const map = mapRef.current;
      if (!map) return;
      const parent = map.parentElement;
      if (!parent) return;
      const parentRect = parent.getBoundingClientRect();
      const imgW = map.naturalWidth;
      const imgH = map.naturalHeight;
      const parentW = parentRect.width;
      const parentH = parentRect.height;
      const scale = Math.min(parentW / imgW, parentH / imgH);
      const displayW = imgW * scale;
      const displayH = imgH * scale;
      const left = (parentW - displayW) / 2;
      const top = (parentH - displayH) / 2;
      setMapRect({ left, top, width: displayW, height: displayH });
      setRelativeSize(scale);
    }, 0);
  }

  return (
    <main
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#90DBF8',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 지도 이미지와 동물 버튼을 지도 기준으로 배치 */}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* 지도 이미지 */}
        <img
          ref={mapRef}
          src="/worldmap.png"
          alt="세계지도"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
          onLoad={handleImgLoad}
        />
        {/* 동물 버튼들 - 지도 내부에 고정 */}
        {animals.map(animal => {
          // 지도 크기에 따라 버튼 크기 자동 조정 (지도 너비의 8%를 기본, 최소 40, 최대 animal.size)
          // 기준 지도 너비를 하드코딩하지 않고, 실제 지도 원본 이미지의 naturalWidth를 사용
          const dynamicSize = animal.size * relativeSize; // 4091은 worldmap.png의 원본 너비
          // 지도 원본 비율 기준으로 위치 계산 (contain 여백 포함)
          const left = mapRect.left + animal.x * mapRect.width;
          const top = mapRect.top + animal.y * mapRect.height;
          return (
            <button
              key={animal.name}
              onClick={() => router.push(animal.page)}
              style={{
                position: 'absolute',
                left,
                top,
                width: dynamicSize,
                height: dynamicSize,
                transform: 'translate(-50%, -50%)',
                border: 'none',
                padding: 0,
                background: 'none',
                cursor: 'pointer',
                outline: 'none',
              }}
              aria-label={`${animal.alt} 설명 페이지로 이동`}
              // 마우스 호버시 이미지 필터 적용
              onMouseEnter={e => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.filter = animal.filter;
              }}
              // 마우스가 버튼을 떠날 때 필터와 transform 모두 원상복구
              onMouseOut={e => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.filter = 'none';
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
              }}
              // 버튼 누를 때 약간 축소되는 효과
              onMouseDown={e => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(0.96)'}
              onMouseUp={e => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'}
            >
              <img
                src={animal.image}
                alt={animal.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  pointerEvents: 'none',
                }}
              />
            </button>
          );
        })}
      </div>
    </main>
  );
}
