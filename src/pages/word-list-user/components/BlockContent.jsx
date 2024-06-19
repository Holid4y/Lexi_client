import React, {useEffect} from "react";

import { useDispatch, useSelector } from "react-redux";
// import { fetchVocabulary } from "../../common/reducers/vocabularySlice";

function BlockContent() {
  const dispatch = useDispatch();
//   const { words, loading, error } = useSelector((state) => state.vocabulary);

  useEffect(() => { 
    console.log('init')
  }, []);
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
