import axios from 'axios';
import { useEffect, useState } from 'react';
import { HttpStatusCode } from '../constants/HttpStatusCode';
import { toast } from 'react-toastify';

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
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>(null);
  const [statusDone, setStatusDone] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setStatusCode(null);

    try {
      const response = await axios({
        method: method,
        url: url,
        headers: headers,
        data: body,
      });

      setData(response.data);
      setStatusCode(response.status);

      if (response.status === HttpStatusCode.OK) {
        // ativar e desativar apos alguns segundos a tela de concluido
        setStatusDone(true);

        setTimeout(() => {
          setStatusDone(false);
        }, 3000);
      }
    } catch (error: any) {
      setError(error);

      if (error.status === HttpStatusCode.UNPROCESSABLE_ENTITY)
        toast.error(error.response.data.errors.plate[0], { theme: 'colored' });

      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoRun) fetchData();
  }, [url]);

  return { loading, data, error, refetch: fetchData, statusDone, statusCode };
};

export default useFetch;
