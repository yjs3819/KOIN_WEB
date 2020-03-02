import React, { useState, useEffect, useCallback } from 'react';
import useDarkenBackground from "../../hooks/useDarkenBackground";
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { getStoreDetailInfo } from "../../modules/store";
import StoreDetail from "../../components/InfoComponents/StoreDetail";
import StorePoster from "../../components/InfoComponents/StorePoster";
import StoreBanner from "../../components/InfoComponents/StoreBanner";
import Cookies from "js-cookie";


export default function StoreDetailContainer ({ id }) {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState('');
  const { data, loading, error, image} = useSelector(state => state.storeReducer.store);
  const history = useHistory();

  const selectImage = useCallback(
    (selectedImage) => setSelectedImage(selectedImage), []
  )
  const [setShow, DarkBackgroundProvider] = useDarkenBackground(StorePoster, {image, selectedImage, selectImage});

  const convertEventDDay = useCallback(endDate => {
    const nowTime = Date.now();
    const endTime = new Date(endDate).getTime();
    const DDay = Math.ceil((endTime - nowTime) / (1000 * 3600 * 24));

    return DDay > 7 ?
      '진행중' :
      `마감 D-${DDay}`
  }, []);

  useEffect(() => {
    dispatch(getStoreDetailInfo(id));
  }, [dispatch, id]);

  useEffect(() => {
    Cookies.set("storeNewFlag", false);
  }, []);

  const handleClickImage = useCallback(
    (selectedImage) => {
      setSelectedImage(selectedImage);
      setShow(true);
    }, []
  );

  return (
    <DarkBackgroundProvider>
      <StoreDetail
        store={data}
        selectImage={handleClickImage}
        convertEventDDay={convertEventDDay}
        history={history} >
        {
          data !== null && data.event_articles.length !== 0 && (
            <StoreBanner
              promotionData={data.event_articles[0]}
              expand={true} />
          )
        }
      </StoreDetail>
    </DarkBackgroundProvider>
  )
}