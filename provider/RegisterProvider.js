import React, {useState} from 'react';

const RegisterContext = React.createContext();

const RegisterProvider = props => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [street, setStreet] = useState('');
  const [barangay, setBarangay] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [region, setRegion] = useState('');
  const [validIdLink, setValidIdLink] = useState('');
  const [photoWithIdLink, setPhotoWithIdLink] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValidated, setisValidated] = useState('');
  const [validatedBy, setValidatedBy] = useState('');
  const [validatedByUserType, setValidatedByUserType] = useState('');
  const [userType, setUserType] = useState('');
  const [lastUpdatedId, setLastUpdatedId] = useState('');
  const [lastUpdatedUserType, setLastUpdatedUserType] = useState('');
  const [lastUpdateDate, setLastUpdateDate] = useState('');
  const [isDeactivated, setIsDeactivated] = useState('');
  const [isDeactivatedById, setIsDeactivatedById] = useState('');

  //FOR FILE IMAGES
  const [id, setId] = useState([]);
  const [idUrl, setIdUrl] = useState('');
  const [idName, setIdName] = useState('');
  const [photoId, setPhotoId] = useState([]);
  const [photoIdUrl, setPhotoIdUrl] = useState('');
  const [photoIdName, setPhotoIdName] = useState('');

  return (
    <RegisterContext.Provider
      value={{
        fname,
        lname,
        birthday,
        street,
        barangay,
        city,
        zip,
        region,
        validIdLink,
        photoWithIdLink,
        profilePicture,
        email,
        contactNumber,
        username,
        password,
        isValidated,
        validatedBy,
        validatedByUserType,
        userType,
        lastUpdatedId,
        lastUpdatedUserType,
        lastUpdateDate,
        isDeactivated,
        isDeactivatedById,
        id,
        idUrl,
        idName,
        photoId,
        photoIdUrl,
        photoIdName,
        setFname,
        setLname,
        setBirthday,
        setStreet,
        setBarangay,
        setCity,
        setZip,
        setRegion,
        setValidIdLink,
        setPhotoWithIdLink,
        setProfilePicture,
        setEmail,
        setContactNumber,
        setUsername,
        setPassword,
        setisValidated,
        setValidatedBy,
        setValidatedByUserType,
        setUserType,
        setLastUpdatedId,
        setLastUpdatedUserType,
        setLastUpdateDate,
        setIsDeactivated,
        setIsDeactivatedById,
        setId,
        setIdUrl,
        setIdName,
        setPhotoId,
        setPhotoIdUrl,
        setPhotoIdName,
      }}>
      {props.children}
    </RegisterContext.Provider>
  );
};

export {RegisterProvider, RegisterContext};
