import React, {useState} from 'react';

const UserContext = React.createContext();

const UserProvider = props => {
  const [id, setID] = useState();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [birthday, setBirthday] = useState();
  const [street, setStreet] = useState();
  const [barangay, setBarangay] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [region, setRegion] = useState();
  const [validIdLink, setValidIdLink] = useState();
  const [photoWithIdLink, setPhotoWithIdLink] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [email, setEmail] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isValidated, setisValidated] = useState();
  const [validatedBy, setValidatedBy] = useState();
  const [validatedByUserType, setValidatedByUserType] = useState();
  const [userType, setUserType] = useState();
  const [lastUpdatedId, setLastUpdatedId] = useState();
  const [lastUpdatedUserType, setLastUpdatedUserType] = useState();
  const [lastUpdateDate, setLastUpdateDate] = useState();
  const [isDeactivated, setIsDeactivated] = useState();
  const [isDeactivatedById, setIsDeactivatedById] = useState();

  return (
    <UserContext.Provider
      value={{
        id,
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
        setID,
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
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
