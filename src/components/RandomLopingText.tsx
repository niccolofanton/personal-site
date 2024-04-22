import { useEffect, useState } from 'react';

interface FadeBufferItem {
  c: number;
  l: string;
}


interface RandomLoopingTextProps {
  text: string;
  fadeIn: boolean;
  codeletters?: string;
  delay?: number;
  loop: {
    keywork: string;
    delay: number;
    words: string[];
    separator?: string;
  } 
}

export function RandomLoopingText({ ...props }: RandomLoopingTextProps) {

  const { text, codeletters, delay, loop, fadeIn } = props;

  const _codeletters = codeletters ?? "abcdefghijklmnopqrstuvwxyz1234567890&#*+%?£@§$";

  let current_length = 0;
  let fadeBuffer: Boolean | FadeBufferItem[] = false;
  let [dText, setDText] = useState('')

  let loopFadeBuffer: Boolean | FadeBufferItem[] = false;
  let currentLoopIndex = 0;
  let currentLoopProgress = '';

  const toClear: NodeJS.Timeout[] = [];

  useEffect(() => {

    if (!fadeIn) {
      current_length = text.length;
      setDText(randomize(text.substring(0, current_length)))
      toClear.push(setTimeout(animateFadeBuffer, 350))
      return;
    }


    setDText('')
    toClear.push(setTimeout(animateIn, delay ?? 0));

    return () => {
      toClear.forEach((timeout) => {
        clearTimeout(timeout);
      });
    }
  }, [])

  const randomize = (text: string) => {
    let random_text = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === ' ') {
        random_text += ' ';
        continue;
      }
      random_text += _codeletters.charAt(Math.floor(Math.random() * _codeletters.length));
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
      toClear.push(setTimeout(animateIn, point))

    } else {
      toClear.push(setTimeout(animateFadeBuffer, 400))
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
        message += _codeletters.charAt(Math.floor(Math.random() * _codeletters.length));
      } else {
        point = Math.max(i * 1.4, 33.3);
        message += fader.l;
      }
    }

    setDText(message)

    if (do_cycles === true) {
      toClear.push(setTimeout(animateFadeBuffer, point));
    } else if (loop) {
      currentLoopProgress = loop.keywork;
      toClear.push(setTimeout(fadeOut, loop.delay ?? 3000));
    }
  };


  // --- loop

  const renderLoopText = () => {
    setDText(text.replace(loop.keywork, currentLoopProgress))
  }

  const loopText = () => {
    loopFadeBuffer = false;

    if (currentLoopProgress == '') {
      currentLoopIndex++;
      if (currentLoopIndex >= loop.words.length) {
        currentLoopIndex = 0;
      }
    }

    toClear.push(setTimeout(printRandomWord, 200))
  };

  const printRandomWord = () => {
    if (currentLoopProgress.length < loop.words[currentLoopIndex].length) {
      currentLoopProgress += _codeletters.charAt(Math.floor(Math.random() * _codeletters.length));

      renderLoopText()

      toClear.push(setTimeout(printRandomWord, 100))
      return;
    }

    toClear.push(setTimeout(decrypt, 100))
  }

  const decrypt = () => {
    if (loopFadeBuffer === false) {
      loopFadeBuffer = [];
      for (let i = 0; i < currentLoopProgress.length; i++) {
        loopFadeBuffer.push({ c: (i + 5), l: loop.words[currentLoopIndex].charAt(i) });
      }
    }

    let do_cycles = false;
    currentLoopProgress = '';

    for (let i = 0; i < (loopFadeBuffer as FadeBufferItem[]).length; i++) {
      let fader = (loopFadeBuffer as FadeBufferItem[])[i];

      if (fader.c > 0) {
        do_cycles = true;
        fader.c--;
        if (loop.words[currentLoopIndex][i] === ' ') {
          currentLoopProgress += ' ';
          continue;
        }
        currentLoopProgress += _codeletters.charAt(Math.floor(Math.random() * _codeletters.length));
      } else {
        currentLoopProgress += fader.l;
      }
    }

    renderLoopText()

    if (do_cycles === true) {
      toClear.push(setTimeout(decrypt, 50))
    } else if (loop) {
      toClear.push(setTimeout(fadeOut, 3000))
    }
  }

  const fadeOut = () => {
    if (currentLoopProgress.length > 0) {
      currentLoopProgress = currentLoopProgress.substring(0, currentLoopProgress.length - 1);
      renderLoopText()
      toClear.push(setTimeout(fadeOut, 100))
      return;
    }

    loopText();
  }

  return (
    <div className='font-mono relative'>
      <span style={{ color: 'rgba(0,0,0,0)' }}>{text.length > dText.length ? text : dText}</span>
      <span className='absolute top-0 left-0'>{dText}</span>
    </div>
  )
}