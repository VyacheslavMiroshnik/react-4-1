import { useState } from 'react';
import React from 'react';

export default function Converter() {
  const [allColors, setColor] = useState({ hex: '', rgb: '', error: false });
  const hexToRgb = (color: string) => {
    const hexInt = parseInt(color.slice(1), 16);
    const r = (hexInt >> 16) & 255;
    const g = (hexInt >> 8) & 255;
    const b = hexInt & 255;

    setColor((prevColor) => ({ ...prevColor, rgb: `rgb(${r},${g},${b})` }));
    console.log(allColors.rgb);
  };
  const onValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor((prevColor) => ({ ...prevColor, hex: '', rgb: '', error: false }));

    if (e.target.value.length === 7) {
      const correctColor = /^#[a-fA-F\d]{2}[a-fA-F\d]{2}[a-fA-F\d]{2}/.test(
        e.target.value
      );
      if (correctColor) {
        setColor((prevColor) => ({ ...prevColor, hex: e.target.value }));
        hexToRgb(e.target.value);
      } else {
        setColor((prevColor) => ({ ...prevColor, rgb: 'red', error: true }));
      }
    }
  };

  const style = {
    backgroundColor: allColors.rgb,
  };

  return (
    <div className='converter_container' style={style}>
      <form
        action='submit'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type='text'
          name='hex'
          id='hex'
          onChange={onValid}
          maxLength={7}
        />
        <label htmlFor='hex'>
          {allColors.error ? 'Ошибка' : allColors.rgb}
        </label>
      </form>
    </div>
  );
}
