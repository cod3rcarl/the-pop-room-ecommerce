import cookie from 'js-cookie';

export const setCookie = (key, value) => {
  if (window !== 'undefined') {
    //Set cookie, expires in 1 day
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key) => {
  if (window !== 'undefined') {
    //Set cookie, expires in 1 day
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key) => {
  if (window !== 'undefined') {
    //Set cookie, expires in 1 day
    return cookie.get(key);
  }
};

export const setLocalStorage = (key, value) => {
  if (window !== 'undefined') {
    //Set cookie, expires in 1 day
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (window !== 'undefined') {
    //Set cookie, expires in 1 day
    localStorage.removeItem(key);
  }
};

export const authenticate = (data) => {
  setCookie('token', data.token);
  setLocalStorage('userInfo', data);
};

export const signout = () => {
  removeCookie('token');
  removeLocalStorage('userInfo');
  removeLocalStorage('basketItems');
};

export const isAuth = () => {
  if (window !== 'undefined') {
    const cookieCheck = getCookie('token');
    if (cookieCheck) {
      if (localStorage.getItem('userInfo')) {
        return JSON.parse(localStorage.getItem('userInfo'));
      } else {
        return null;
      }
    }
  }
};

export const updateUser = (response, next) => {
  if (window !== 'undefined') {
    let auth = JSON.parse(localStorage.getItem('userInfo'));
    auth = response.data;
    localStorage.setItem('userInfo', JSON.stringify(auth));
  }
  next();
};
