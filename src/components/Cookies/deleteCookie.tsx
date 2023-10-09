import React from 'react'

function deleteCookie(cname:string) {
  // Set the expiration date in the past to delete the cookie
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export default deleteCookie;