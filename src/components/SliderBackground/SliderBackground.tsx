import React from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

import css from './SliderBackground.module.scss';
import { CMSImage } from "@/models/cms";
import { img } from "@/helpers/cms";
import Overlay, { Darkness } from "@/components/Overlay/Overlay";

const swipeAutoPlayConfig = {
  delay: 3000,
  disableOnInteraction: false,
  pauseOnMouseEnter: false,
  stopOnLastSlide: false,
  waitForTransition: true,
  reverseDirection: false,
}

interface SliderBackgroundProps {
  images: CMSImage[];
  height?: string | number;
  darkness?: Darkness;
}

const SliderBackground = (props: SliderBackgroundProps) => {
  const { images, height = '100vh', darkness = 0 } = props;

  return (
    <div style={{height}} className={css.wrapper}>
      <div className={css.container}>
        <Overlay darkness={darkness} />
        <Swiper
          speed={5000}
          autoplay={swipeAutoPlayConfig}
          style={{ height }}
          modules={[EffectFade, Autoplay]}
          effect={'fade'}
        >
          {images.map((image, i) => {
            return (
              <SwiperSlide key={i}>
                <div style={{ backgroundImage: `url(${img(image)})` }} className={css.image}></div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default SliderBackground;
