import { useSelector } from "../../store";
import ProfileEditModal from "../../components/Popups/ProfileEditModal";
import UploadSongModal from "../Library/UploadSongModal";

const ModalLayout = () => {
    const { modal } = useSelector((state) => state.menu);

    return (
        <>
            {modal === 'editProfile' && <ProfileEditModal/>}
            {modal === 'uploadSong' && <UploadSongModal/>}
        </>
    );
};

export default ModalLayout;