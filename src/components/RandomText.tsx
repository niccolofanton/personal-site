import { useEffect, useState } from 'react';

interface FadeBufferItem {
  c: number;
  l: string;
}

interface Props {
  text: string,
  speed?: number | false,
  fadeIn?: boolean,
  delay?: number
}

export function RandomText({
  text,
  speed = false,
  fadeIn = true,
  delay = 0
}: Props) {

  let codeletters = "abcdefghijklmnopqrstuvwxyz1234567890&#*+%?£@§$";
  let current_length = 0;

  let fadeBuffer: Boolean | FadeBufferItem[] = false;
  let [dText, setDText] = useState('')

  useEffect(() => {
    if (!fadeIn) {
      current_length = text.length;
      setDText(randomize(text.substring(0, current_length)))
      setTimeout(animateFadeBuffer, 350 + delay);
      return;
    }
    
    setDText('')
    setTimeout(animateIn, 800 + delay);
  }, [])

  const randomize = (text: string) => {
    let random_text = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === ' ') {
        random_text += ' ';
        continue;
      }
      random_text += codeletters.charAt(Math.floor(Math.random() * codeletters.length));
    }

    return random_text;
  };


  const animateIn = () => {
    if (current_length < text.length) {
      current_length = current_length + 2;
      if (current_length > text.length) {
        current_length = text.length;
      }

      const point = Math.max(current_length * 1.7, 33.3);

      let message = randomize(text.substring(0, current_length));
      setDText(message)
      setTimeout(animateIn, speed ? speed : point);

    } else {
      setTimeout(animateFadeBuffer, 400);
    }
  };

  const animateFadeBuffer = () => {
    if (fadeBuffer === false) {
      fadeBuffer = [];
      for (let i = 0; i < text.length; i++) {
        fadeBuffer.push({ c: (i + 5), l: text.charAt(i) });
      }
    }

    let do_cycles = false;
    let message = '';
    let point = 0;

    for (let i = 0; i < (fadeBuffer as FadeBufferItem[]).length; i++) {
      let fader = (fadeBuffer as FadeBufferItem[])[i];

      if (fader.c > 0) {
        do_cycles = true;
        fader.c--;
        if (text[i] === ' ') {
          message += ' ';
          continue;
        }
        message += codeletters.charAt(Math.floor(Math.random() * codeletters.length));
      } else {
        point = Math.max(i * 1.4, 33.3);
        message += fader.l;
      }
    }

    setDText(message)

    if (do_cycles === true) {
      setTimeout(animateFadeBuffer, speed ? speed : point);
    }
  };

  return (
    <div className='font-mono relative'>
      <span style={{ color: 'rgba(0,0,0,0)' }}>{text.substring(0)}</span>
      <span className='absolute top-0 left-0'>{dText}</span>
    </div>
  )
}