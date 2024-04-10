import { useDispatch, useSelector } from "../../store";
import toast from "react-hot-toast";
import { closeAlert } from '../../store/reducers/alert';

const Alert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const { type, message, open } = alert;

  const dismissCallback = () => {
    dispatch(closeAlert());
  };

    return (
        <>
        {(type=="info" && open) && (
          toast.custom(
            (t) => (
              <div class="flex items-center p-4 mb-4 text-md text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-700 dark:text-blue-400" role="alert">
                <svg class="flex-shrink-0s inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                <span class="font-medium text-md">{message}</span>
                </div>
              </div>
            ),
            { id: "unique-notification", position: "top-center", duration:2000, onDismiss: dismissCallback })
        )}        
        {(type=="danger" && open) && (
          toast.custom(
            (t) => (
              <div class="flex items-center p-4 mb-4 text-md text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  <span class="font-medium text-md">{message}</span>
                </div>
              </div>
            ),
            { id: "unique-notification", position: "top-center", duration:2000 })
        )}
        {(type=="success" && open) && (
          toast.custom(
            (t) => (
              <div class="flex items-center p-4 mb-4 text-md text-green-800 rounded-lg bg-green-50 dark:bg-gray-700 dark:text-green-400" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  <span class="font-medium text-md">{message}</span>
                </div>
              </div>
            ),
            { id: "unique-notification", position: "top-center", duration:2000 })
        )}
        {(type=="warning" && open) && (
          toast.custom(
            (t) => (
              <div class="flex items-center p-4 mb-4 text-md text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-700 dark:text-yellow-300" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  <span class="font-medium text-md">{message}</span>
                </div>
              </div>
            ),
            { id: "unique-notification", position: "top-center", duration:2000 })
        )}
        </>
    );
};

export default Alert;
