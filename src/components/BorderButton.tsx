import React, {type FC, type PropsWithChildren} from "react";
import { Button } from "@mui/material";



export const BorderButton: FC<PropsWithChildren> = ({children}) => {
  const style = {
    button: {
      borderRadius: '100px',
      backgroundColor: '#CACCBE',
      width: '60px',
      height: '60px'
    }
  }
  return <Button sx={style.button}>{children}</Button>
}