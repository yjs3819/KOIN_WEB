import React, {useEffect} from "react";
import styled from "styled-components";
import '../static/quill.snow.css';
import ReactQuill from "react-quill";

const Main = styled.div`
  width: 100%;
  border-top: #f7941e 5px solid;
  
  @media(max-width: 576px){
    border-top: none;
  }
`;

const Container = styled.div`
  width: 1132px;
  margin-left: auto;
  margin-right: auto;
  
  @media(max-width: 576px){
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const Header = styled.div`
  height: 116px;
  border-bottom: #175c8e 4px solid;
  
  @media(max-width: 576px){
    display: none;
  }
`;

const Title = styled.div`
  float: left;
  font-size: 30px;
  font-family: NanumSquare, serif;
  font-weight: 800;
  letter-spacing: -1.5px;
  padding-top: 63px;
  color: #175c8e;
`;

const GoListBtn = styled.button`
  float: right;
  padding: 6px 13px;
  color: white;
  background-color: #175c8e;
  border: 1px #175c8e solid;
  font-size: 13px;
  cursor: pointer;
  margin-top: 63px;
`;

const Form = styled.div`
  width: 1132px;
  text-align: left;
  height: 505px;
  
  /* 체크박스 커스텀 */
  input[type=radio] {
    display: none;
  }

  input[type=radio] + label {
    float: left;
    display: inline-block;
    cursor: pointer;
    position: relative;
    padding-left: 24px;
    font-size: 12px;
    line-height: 20px;
  }

  input[type=radio] + label:before {
    content: "";
    width: 16px;
    height: 16px;
    position: absolute;
    left: 0;
    top: 0px;
    background-color: #ffffff;
    border: 1px solid #d2dae2;
    line-height: 13px;
  }

  input[type=radio]:checked + label:before {
    content: "";
    background-image: url("https://static.koreatech.in/assets/img/check.png");
    background-size: cover;
  }

  button {
    cursor: pointer;
  }
  
  @media(max-width: 576px){
    width: 100%;
    height: 100%;
    
    input::placeholder {
      font-size: 16px;
      font-weight: normal;
      line-height: 1.5;
      letter-spacing: -0.8px;
      color: rgba(227, 227, 227, 0.87);
    }
  }
`;

const BoardHead = styled.div`
  border-bottom: 1px solid #175c8e;
  width: 100%;
  text-align: left;
  
  @media(max-width: 576px){
    height: 56.5px;
    border: none;
  }
`;

const BoardTitleInput = styled.input`
  font-family: NanumBarunGothic, serif;
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -1px;
  color: #252525;
  padding: 26px 20px 7px 20px;
  width: 794px;
  border: 0 white solid;
  word-wrap: break-word;
  
  &::placeholder {
    color: #bec9d5;
  }
  
  @media(max-width: 576px){
    width: calc(100% - 32px);
    font-size: 16px;
    font-weight: normal;
    line-height: 1.5;
    letter-spacing: -0.8px;
    padding-top: 15px;
    padding-bottom: 17.5px;
    padding-right: 16px;
    padding-left: 16px;
    border-bottom: 1px solid #ececec;
  }
`;

const BoardInfo = styled.div`
  display: flex;
  padding-bottom: 27px;
  padding-left: 20px;
  padding-right: 20px;
  
  @media(max-width: 576px){
    display: none;
  }
`;

const Author = styled.div`
  font-family: NanumBarunGothic,serif;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.7px;
  color: #175c8e;
  margin-right: 16px;
`;

const CreatedAt = styled.div`
  font-family: NanumBarunGothic;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.7px;
  color: #858585;
`;

const StateSelect = styled.div`
  height: 104px;
  width: 1082px;
  margin: 0 25px;
  border-bottom: 1px solid #e0e0e0;
  
  p {
    margin-top: 0;
    padding-top: 26px;
    color: #252525;
    letter-spacing: -0.8px;
    font-size: 15px;
  }
  
  @media(max-width: 576px){
    margin: 0;
    width: calc(100% - 32px);
    height: 57px;
    border-bottom: 1px solid #ececec;
    padding: 0 16px 0 16px;
    display: flex;
    align-items: center;
    
    p {
      display: none;
    }
  }
`;

const CheckBoxes = styled.div`
  float: left;
  
  label { 
    margin-right: ${props => props.phone ? "19px" : "28px"};
  }
  
  @media(max-width: 576px){
    input[type=radio] + label {
      font-size: 16px;
      font-weight: normal;
      line-height: 1.5;
      letter-spacing: -0.8px;
      color: #252525;
      width: auto;
      padding-left: 30px;
      margin-right: 30px;
      padding-top: 2px;
    }
    
    input[type=radio] + label:before {
      content: "";
      border: none;
      width:24px;
      height: 24px;
      background-image: url("https://static.koreatech.in/assets/img/mobile__unchecked.png");
      background-size: cover;
    }
    
    input[type=radio]:checked + label:before {
      content: "";
      border: none;
      width: 24px;
      height: 24px;
      background-image: url("https://static.koreatech.in/assets/img/mobile__checked.png");
    }
  }
`;

const LeftForm = styled.div`
  width: 546px;
  float: left;
  margin-right: 40px;
  height: 305px;
  margin-left: 25px;
  
  p, span {
    color: #252525;
    letter-spacing: -0.8px;
    font-size: 15px;
    height: 15px;
    width: 546px;
    padding-top: 13px;
  }
  
  input::placeholder {
    width: 187px;
    height: 15px;
    font-size: 15px;
    letter-spacing: -0.8px;
    text-align: left;
    color: #bec9d5;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  
  @media(max-width: 576px){
    width: 100%;
    height: 209px;
    margin-left: 0;
    
    p, span {
      font-size: 16px;
      font-weight: normal;
      line-height: 1.5;
      letter-spacing: -0.8px;
      color: #252525;
      padding: 0;
      margin: 0;
      height: auto;
      width: 30%;
    }
  }
`;

const LeftFormTitle = styled.div`
  @media(max-width: 576px){
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: calc(100% - 32px);
    height: 57px;
    border-bottom: 1px solid #ececec;
    padding: 0 16px 0 16px;
  }
`;

const LeftFormInput = styled.input`
  width: 506px;
  height: 41px;
  font-size: 15px;
  padding-left: 19px;
  padding-right: 19px;
  background-color: #ffffff;
  border: solid 1px #d2dae2;
  
  @media(max-width: 576px){
    font-size: 16px;
    font-weight: normal;
    line-height: 1.5;
    letter-spacing: -0.8px;
    color: #252525;
    border: none;
    padding: 0;
    width: initial;
    height: initial;
  }
`;

const Place = styled.div`
  @media(max-width: 576px){
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: calc(100% - 32px);
    height: 57px;
    border-bottom: 1px solid #ececec;
    padding: 0 16px 0 16px;
    
    input::placeholder {
      font-size: 16px;
      font-weight: normal;
      line-height: 1.5;
      letter-spacing: -0.8px;
      color: rgba(227, 227, 227, 0.87);
    }
  }
`;

const Phone = styled.div`
  padding-top: 26px;
  
  span {
    color: #252525;
    letter-spacing: -0.8px;
    font-size: 15px;
    height: 15px;
    width: 60px;
    float: left;
    margin-bottom: 15px;
    padding-top: 0;
  }
  
  @media(max-width: 576px){
    border-bottom: 1px solid #ececec;
    padding: 0 16px 0 16px;
    height: 77px;
    margin-top: 15px;
    
    span {
      margin-bottom: 0;
      padding: 0;
      border: none;
      width: 30%;
      justify-content: flex-start;
      font-size: 16px;
      font-weight: normal;
      line-height: 1.5;
      letter-spacing: -0.8px;
      color: #252525;
    }
    
    ${CheckBoxes} {
      display: inline-block;
      width: auto;
    }
    
    input[type=radio] + label {
      font-size: 16px;
      font-weight: normal;
      line-height: 1.5;
      letter-spacing: -0.8px;
      color: #252525;
      width: auto;
      margin-right: 15px;
      padding-left: 30px;
      padding-top: 2px;
    }
    
    ${LeftFormInput} {
      padding: 0;
      width: 70%;
      height: 22px;
      margin-left: 30%;
      margin-top: 16px;
      border: none;
      font-size: 16px;
      font-weight: normal;
      line-height: 1.5;
      letter-spacing: -0.8px;
      color: #252525;
    }
    
    input::placeholder {
      font-size: 16px;
      font-weight: normal;
      line-height: 1.5;
      letter-spacing: -0.8px;
      color: rgba(227, 227, 227, 0.87);
    }
  }
`;

const P = styled.p`
  letter-spacing: -0.8px;
  text-align: left;
  color: #252525;
  font-size: 15px;
  margin-left: 25px;
  
  @media(max-width: 576px){
    display:none;
  }
`;

const Detail = styled.div`
  text-align: left;
  margin-top: 26px;
  height: 522px;
  border-bottom: 1px #175c8e solid;

  @media(max-width: 576px){
    margin-top: 0;
    height: 100%;
  }
`;

const Wysiwyg = styled.div`
  margin-left: 25px;
  
  @media(max-width: 576px){
    margin: 0;
  }
`;

const Footer = styled.div`
  margin-top: 23px;
  height: 157px;
  
  button {
    font-size: 13px;
    color: white;
    letter-spacing: -0.7px;
    padding: 5px 26px;
    cursor: pointer;
  }
  
  ${GoListBtn} {
    padding: 6px 13px;
    margin-top: 0;
  }
  
  @media(max-width: 576px){
    display: none;
  }
`;

const CancelBtn = styled.button`
  margin-right: 6px;
  background: #909090;
  border: 1px solid #909090;
`;

const RegisterBtn = styled.button`
  background: #175c8e;
  border: 1px solid #175c8e;
`;

const MobileMenus = styled.div`
  display: none;
  
  @media(max-width: 576px){
    display: block;
  }
`;

const MobileCancelBtn = styled.button`
  position: absolute;
  top: 20px;
  left: 16px;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.36;
  letter-spacing: -0.7px;
  text-align: left;
  color: #ffffff;
  background-color: #175c8e;
  border: none;
  padding-left: 0;
`;

const MobileRegisterBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 16px;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.36;
  letter-spacing: -0.7px;
  text-align: left;
  color: #ffffff;
  background-color: #175c8e;
  border: none;
  padding-right: 0;
`;

export default function LostItemRegister(
  {
    createdAt,
    type,
    clickType,
    phoneFlag,
    phoneFlagChange,
    setTitle,
    setDate,
    setPlace,
    editorRef,
    history,
    register,
    setPhoneNumber,
    modules,
    imageUpload
  }
) {
  useEffect(() => {
    editorRef.current.editor.getModule("toolbar").addHandler('image', imageUpload);
  }, [editorRef]);

  return (
    <Main>
      <Container>
        <Header>
          <Title>분실물</Title>
          <GoListBtn>목록으로</GoListBtn>
        </Header>
        <Form>
          <BoardHead>
            <BoardTitleInput
              type="text"
              placeholder="제목을 입력하세요. ( 최대 255자 )"
              onInput={e => setTitle(e.target.value)}/>
            <BoardInfo>
              <Author>{JSON.parse(sessionStorage.getItem('userInfo')).nickname}</Author>
              <CreatedAt>{createdAt}</CreatedAt>
            </BoardInfo>
          </BoardHead>
          <StateSelect>
            <p>상태 변경</p>
            {type === 0 &&
            <CheckBoxes>
              <input
                type="radio"
                defaultChecked={type === 0}/>
              <label onClick={clickType(0)}>분실물 습득</label>
              <input
                type="radio"
                defaultChecked={type === 1}/>
              <label onClick={clickType(1)}>분실물 찾기</label>
            </CheckBoxes>
            }
            {type === 1 &&
            <CheckBoxes>
              <input
                type="radio"
                defaultChecked={type === 0}/>
              <label onClick={clickType(0)}>분실물 습득</label>
              <input
                type="radio"
                defaultChecked={type === 1}/>
              <label onClick={clickType(1)}>분실물 찾기</label>
            </CheckBoxes>
            }
          </StateSelect>
          <LeftForm>
            {/*Date*/}
            <LeftFormTitle>
              <p>
                {type === 0 &&
                <span>습득일</span>
                }
                {type === 1 &&
                <span>분실일</span>
                }
              </p>
              <LeftFormInput
                type="date"
                onInput={e => setDate(e.target.value)}/>
            </LeftFormTitle>

            {/*Place*/}
            <Place>
              <p>
                {type === 0 &&
                <span>습득 장소</span>
                }
                {type === 1 &&
                <span>분실 장소</span>
                }
              </p>
              <LeftFormInput
                placeholder={type ? "분실장소를 입력해주세요" : "습득장소를 입력해주세요"}
                onInput={e => setPlace(e.target.value)}/>
            </Place>

            {/*Phone*/}
            <Phone>
              <span>연락처</span>
              {phoneFlag === 0 &&
              <CheckBoxes phone>
                <input
                  type="radio"
                  defaultChecked={phoneFlag}
                />
                <label onClick={phoneFlagChange(1)}>공개</label>
                <input
                  type="radio"
                  defaultChecked={!phoneFlag}
                />
                <label onClick={phoneFlagChange(0)}>비공개</label>
              </CheckBoxes>
              }
              {phoneFlag === 1 &&
              <CheckBoxes phone>
                <input
                  type="radio"
                  defaultChecked={phoneFlag}
                />
                <label onClick={phoneFlagChange(1)}>공개</label>
                <input
                  type="radio"
                  defaultChecked={!phoneFlag}
                />
                <label onClick={phoneFlagChange(0)}>비공개</label>
              </CheckBoxes>
              }
              <LeftFormInput
                type="text"
                disabled={!phoneFlag}
                defaultValue={phoneFlag ? JSON.parse(sessionStorage.getItem('userInfo')).phone_number : ''}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="ex)010-1234-1234"/>
            </Phone>
          </LeftForm>
        </Form>
        <Detail>
          <P>상세정보 입력</P>
          <Wysiwyg>
            {/*<input type="text" name="contents" id="contents" hidden/>*/}
            <ReactQuill
              ref={editorRef}
              modules={modules}
              style={{ height: '400px' }}
            />
          </Wysiwyg>
        </Detail>
        <Footer>
          <CancelBtn onClick={()=> history.push('/lost')}>취소</CancelBtn>
          <RegisterBtn onClick={register}>등록</RegisterBtn>
          <GoListBtn onClick={()=> history.push('/lost')}>목록으로</GoListBtn>
        </Footer>
        <MobileMenus>
          <MobileCancelBtn onClick={()=> history.push('/lost')}>
            취소
          </MobileCancelBtn>
          <MobileRegisterBtn onClick={register}>
            등록
          </MobileRegisterBtn>
        </MobileMenus>
      </Container>
    </Main>
  )
}
