import React from "react";


function OptionsAvatar({ handleAvatarChange }) {

    return (
        <div className="avatar-options">
            <div>
                <label className="form-label">Тип волос:</label>
                <select className="form-select" onChange={(e) => handleAvatarChange("topType", e.target.value)}>
                    <option value="NoHair">No Hair</option>
                    <option value="Eyepatch">Eyepatch</option>
                    <option value="Hat">Hat</option>
                    <option value="Hijab">Hijab</option>
                    <option value="Turban">Turban</option>
                    <option value="WinterHat1">Winter Hat 1</option>
                    <option value="WinterHat2">Winter Hat 2</option>
                    <option value="WinterHat3">Winter Hat 3</option>
                    <option value="WinterHat4">Winter Hat 4</option>
                    <option value="LongHairBigHair">Long Hair Big</option>
                    <option value="LongHairBob">Long Hair Bob</option>
                    <option value="LongHairBun">Long Hair Bun</option>
                    <option value="LongHairCurly">Long Hair Curly</option>
                    <option value="LongHairCurvy">Long Hair Curvy</option>
                    <option value="LongHairDreads">Long Hair Dreads</option>
                    <option value="LongHairFrida">Long Hair Frida</option>
                    <option value="LongHairFro">Long Hair Fro</option>
                    <option value="LongHairFroBand">Long Hair Fro Band</option>
                    <option value="LongHairMiaWallace">Long Hair Mia Wallace</option>
                    <option value="LongHairNotTooLong">Long Hair Not Too Long</option>
                    <option value="LongHairShavedSides">Long Hair Shaved Sides</option>
                    <option value="LongHairStraight">Long Hair Straight</option>
                    <option value="LongHairStraight2">Long Hair Straight 2</option>
                    <option value="LongHairStraightStrand">Long Hair Straight Strand</option>
                    <option value="ShortHairDreads01">Short Hair Dreads 01</option>
                    <option value="ShortHairDreads02">Short Hair Dreads 02</option>
                    <option value="ShortHairFrizzle">Short Hair Frizzle</option>
                    <option value="ShortHairShaggyMullet">Short Hair Shaggy Mullet</option>
                    <option value="ShortHairShortCurly">Short Hair Short Curly</option>
                    <option value="ShortHairShortFlat">Short Hair Short Flat</option>
                    <option value="ShortHairShortRound">Short Hair Short Round</option>
                    <option value="ShortHairShortWaved">Short Hair Short Waved</option>
                    <option value="ShortHairSides">Short Hair Sides</option>
                    <option value="ShortHairTheCaesar">Short Hair The Caesar</option>
                    <option value="ShortHairTheCaesarSidePart">Short Hair The Caesar Side Part</option>
                </select>
            </div>

            <div>
                <label className="form-label">Цвет волос:</label>
                <select className="form-select" onChange={(e) => handleAvatarChange("hairColor", e.target.value)}>
                    <option value="Auburn">Auburn</option>
                    <option value="Black">Black</option>
                    <option value="Blonde">Blonde</option>
                    <option value="BlondeGolden">Blonde Golden</option>
                    <option value="Brown">Brown</option>
                    <option value="BrownDark">Brown Dark</option>
                    <option value="PastelPink">Pastel Pink</option>
                    <option value="Platinum">Platinum</option>
                    <option value="Red">Red</option>
                    <option value="SilverGray">Silver Gray</option>
                </select>
            </div>

            <div>
                <label className="form-label">Тип глаз:</label>
                <select className="form-select" onChange={(e) => handleAvatarChange("eyeType", e.target.value)}>
                    <option value="Default">По умолчанию</option>
                    <option value="Close">Закрытые</option>
                    <option value="Cry">Плачит</option>
                    <option value="Dizzy">Головокружение</option>
                    <option value="EyeRoll">Закатывание глаз</option>
                    <option value="Happy">Счастливые</option>
                    <option value="Hearts">Сердце</option>
                    <option value="Side">Смотрит в сторону</option>
                    <option value="Squint">Прищурился</option>
                    <option value="Surprised">Удивление</option>
                    <option value="Wink">Подмигивание</option>
                    <option value="WinkWacky">Подмигивание дурацкое</option>
                </select>
            </div>

            <div>
                <label className="form-label">Тип рта:</label>
                <select className="form-select" onChange={(e) => handleAvatarChange("mouthType", e.target.value)}>
                    <option value="Default">По умолчанию</option>
                    <option value="Concerned">Обеспокоенный</option>
                    <option value="Disbelief">Сомнение</option>
                    <option value="Eating">Принимает пищу</option>
                    <option value="Grimace">Гримаса</option>
                    <option value="Sad">Грустный</option>
                    <option value="ScreamOpen">Кричит</option>
                    <option value="Serious">Серьезный</option>
                    <option value="Smile">Улыбается 1</option>
                    <option value="Twinkle">Улыбается 2</option>
                    <option value="Tongue">Показывает язык</option>
                    <option value="Vomit">Рвота</option>
                </select>
            </div>

            <div>
                <label className="form-label">Тип одежды:</label>
                <select className="form-select" onChange={(e) => handleAvatarChange("clotheType", e.target.value)}>
                    <option value="BlazerShirt">Blazer Свитер</option>
                    <option value="BlazerSweater">Blazer Рубашка</option>
                    <option value="CollarSweater">Рубашка</option>
                    <option value="Hoodie">Толстовка с капюшоном</option>
                    <option value="ShirtCrewNeck">Рубашка с круглым вырезом</option>
                    <option value="ShirtScoopNeck">Рубашка с овальным вырезом</option>
                    <option value="ShirtVNeck">Рубашка с V-образным вырезом</option>
                </select>
            </div>

            <div>
                <label className="form-label">Цвет одежды:</label>
                <select className="form-select" onChange={(e) => handleAvatarChange("clotheColor", e.target.value)}>
                    <option value="Black">Черный</option>
                    <option value="Blue01">Синий 1</option>
                    <option value="Blue02">Синий 2</option>
                    <option value="Gray01">Серый 1</option>
                    <option value="Gray02">Серый 2</option>
                    <option value="PastelBlue">Пастельный синий</option>
                    <option value="PastelGreen">Пастельный зеленый</option>
                    <option value="PastelOrange">Пастельный оранжевый</option>
                    <option value="PastelRed">Пастельный красный</option>
                    <option value="PastelYellow">Пастельный желтый</option>
                    <option value="Pink">Розовый</option>
                    <option value="Red">Красный</option>
                    <option value="White">Белый</option>
                </select>
            </div>
        </div>
    );
}

export default OptionsAvatar;
