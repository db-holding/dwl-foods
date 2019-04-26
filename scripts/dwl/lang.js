/**
 * Copyright © 2019 Alexandre Borela <alexandre@borela.tech>
 *
 * NOTICE: All information contained herein is, and remains the property of
 * Alexandre Borela and his suppliers, if any. The intellectual and technical
 * concepts contained herein are proprietary to Alexandre Borela and his
 * suppliers and may be covered by patents, patents in process, and are
 * protected by trade secret or copyright law. Dissemination of this information
 * or reproduction of this material is strictly forbidden unless prior written
 * permission is obtained from Alexandre Borela.
 */

'use strict';

const L10N_ELEMENTS = document.querySelectorAll('[data-lang]')

function translate(lang) {
  for (const ELEMENT of L10N_ELEMENTS) {
    const LANG = ELEMENT.getAttribute('data-lang')
    if (!LANG.includes(lang))
      ELEMENT.hidden = true
    else
      ELEMENT.hidden = false
  }

  localStorage.setItem('lang', lang)
}

const STORED_LANG = localStorage.getItem('lang')
if (STORED_LANG && STORED_LANG !== 'pt')
  translate(STORED_LANG)
