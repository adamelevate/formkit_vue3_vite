import { arrowDown, arrowUp, check, circle, close, down, fileDoc, spinner, star, trash, date, left, right, } from "@formkit/icons"
import { generateClasses } from '@formkit/themes'
import theme from './src/plugins/formtheme.js'

const config = {

  
    // pass our theme object to generateClasses
  classes: generateClasses(theme),
  // classes: theme,

  icons: {
    // include supporting icons from @formkit/icons
    arrowDown,
    arrowUp,
    close,
    checkboxDecorator: check,
    fileItem: fileDoc,
    fileRemove: close,
    noFiles: fileDoc,
    radioDecorator: circle,
    select: down,
    spinner,
    star,
    trash,
    date,
    left,
    right,
  }
}


export default config