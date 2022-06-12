import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GiNotebook } from 'react-icons/gi';
import { useRecoilState, useRecoilValue } from 'recoil';
import { companyState } from '../atoms/companiesAtom';
import { DirectoryMenuItem, directoryMenuState } from '../atoms/directoryMenu';


const useDirectory = () => {
    const [directoryState, setDirectoryState] =useRecoilState(directoryMenuState);
    const router = useRouter();
    const companyStateValue = useRecoilValue(companyState);

    const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
        setDirectoryState((prev) => ({
            ...prev,
            selectedMenuItem: menuItem,
          }));
      
          router?.push(menuItem.link);
          if (directoryState.isOpen) {
            toggleMenuOpen();
          }
    }

    const toggleMenuOpen = () => {
        setDirectoryState((prev) => ({
          ...prev,
          isOpen: !directoryState.isOpen,
        }));
    };

    useEffect(() => {
        const {currentCompany} = companyStateValue;

        if (currentCompany) {
            setDirectoryState(prev => ({
                ...prev,
                selectedMenuItem: {
                    displayText: `/${currentCompany.id}`,
                    link: `/${currentCompany.id}`,
                    icon: GiNotebook,
                    iconColor: "blue.500",
                    imageURL: currentCompany.imageURL,
                }
            }))
        }
    }, [companyStateValue.currentCompany])

    return {directoryState, toggleMenuOpen, onSelectMenuItem};
}
export default useDirectory;