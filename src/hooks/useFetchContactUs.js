import { useState, useEffect } from "react";
import {
  fetchContactUsPhoneNos,
  fetchContactUsAddress,
} from "../services/localService/LocalService";

function useFetchContactUsPhoneNos() {
  const [contactUsPhoneData, setData] = useState([]);
  const [isContactUsPhoneLoading, setIsLoading] = useState(false);
  const [contactUsPhoneError, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchContactUsPhoneNos();
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { contactUsPhoneData, isContactUsPhoneLoading, contactUsPhoneError };
}

function useFetchContactUsAddress() {
  const [contactUsAddressData, setData] = useState([]);
  const [isContactUsAddressLoading, setIsLoading] = useState(false);
  const [contactUsAddressError, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchContactUsAddress();
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    contactUsAddressData,
    isContactUsAddressLoading,
    contactUsAddressError,
  };
}

export { useFetchContactUsPhoneNos, useFetchContactUsAddress };
