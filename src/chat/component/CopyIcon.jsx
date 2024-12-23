import React, { useState } from 'react'
import { Tooltip, Icon } from '@/components'
import styles from './style.module'
import { classnames } from '../../components/utils';

export function CopyIcon({value:text,tooltip}) {
  const [icon, setIcon] = useState('copy');
  function handleCopy() {
    const tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px;"
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    setIcon('copy-ok')
    setTimeout(() => {
      setIcon('copy')
    }, 1500);
  }

  return (
    <Tooltip text={tooltip} className={styles.copy}><Icon onClick={handleCopy} type={icon} /></Tooltip>
  )
}

CopyIcon.defaultProps = {
  text: 'copy'
}