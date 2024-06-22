import React, {useEffect} from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchWordGet } from "../../../common/reducers/wordSlice";

function BlockContent({ pk }) {
  const dispatch = useDispatch();
  const { translations, synonyms, meanings, loading, error } = useSelector((state) => state.word);

  useEffect(() => { 
    console.log('init BlockContent', 'word pk:', pk)
    dispatch(fetchWordGet(pk))
  }, [dispatch]);

  useEffect(() => { 
    if (translations){
      console.log(pk, translations, synonyms, meanings)
    }
  }, [translations]);

  
  return (
    <>
      <p>
        следить, увидеть, видеть, понаблюдать, смотреть, рассматривать,
        пронаблюдать, соблюдать, придерживаться, соблюсти, следовать,
        прослеживать, проследить, блюсти
      </p>
      <hr />
      <p>watch, see, keep watch, notice, note, follow, adhere, keep, trace</p>
      <button className="btn btn-danger w-100 mt-2">Удалить</button>
    </>
  );
}

export default BlockContent;
