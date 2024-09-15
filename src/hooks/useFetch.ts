import axios from 'axios';
import { useEffect, useState } from 'react';

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';

interface IUseFetchProps {
  url: string;
  method: Method;
  headers?: Record<string, string>;
  body?: object;
  autoRun?: boolean;
}

const useFetch = ({ url, method = 'GET', headers, body, autoRun = true }: IUseFetchProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method: method,
        url: url,
        headers: headers,
        data: body,
      });

      setData(response.data);
      console.log(response);
    } catch (error: any) {
      setError(error);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoRun) fetchData();
  }, [url]);

  return { loading, data, error, refetch: fetchData };
};

export default useFetch;
