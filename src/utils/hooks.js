import axios from "axios";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { baseUrl } from "../constants";

export const useKeyboardVisible = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
}

export const useGetData = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios.get(baseUrl + url)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        setError(err);
      });

    setLoading(false);
  }, []);

  return {
    loading,
    error,
    data,
  }
}

export const useGetDataBearer = (url, token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios.get(baseUrl + url, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        setError(err);
      });

    setLoading(false);
  }, []);

  return {
    loading,
    error,
    data,
  }
}

export const usePostData = (url, onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = (inputData) => {
    setLoading(true);

    axios.post(baseUrl + url, inputData)
      .then(res => {
        setData(res.data);
        onSuccess();
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }

  const reset = () => {
    setError(null);
    setData(null);
  }

  return {
    loading,
    error,
    data,
    postData,
    reset
  }
}

export const usePostDataBearer = (url, token, onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = (inputData) => {
    setLoading(true);

    axios.post(baseUrl + url, inputData, {    
      headers: {
      'Authorization': 'Bearer ' + token
    }})
      .then(res => {
        setData(res.data);
        onSuccess();
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }

  const reset = () => {
    setError(null);
    setData(null);
  }

  return {
    loading,
    error,
    data,
    postData,
    reset
  }
}