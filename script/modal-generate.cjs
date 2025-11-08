const fs = require('fs');
const path = require('path');

const [,, modalName, modalPath] = process.argv;

if (!modalName || !modalPath) {
    console.error('please enter the name and the path of modal');
    console.error('for example: node modal-generate.cjs MyModalComponent src/components/modals');
    process.exit(1);
}

const componentName = modalName.replace(/\.[tj]sx?$/, '');
const fileName = `${componentName}.tsx`;
const fullPath = path.join(process.cwd(), modalPath, fileName);

const template = `
import CustomModal from "../general/modal/Modal.tsx";
import CustomButton from "../general/button/Button.tsx";

interface IProps {
  isOpen: boolean;
  onDismiss: () => void;
}

const ${componentName} = ({ onDismiss, isOpen }: IProps) => {
  return (
    <CustomModal
      isOpen={isOpen}
      title={"${componentName}"}
      onDismiss={onDismiss}
      footerData={
        <>
          <CustomButton label={'submit'} onClick={() => {}} type={'submit'} variant='primary' />
          <CustomButton label={'close'} onClick={onDismiss} type={'button'} variant='Cancel' />
        </>
      }
    >
      <>
        {/* your modal code ... */}
      </>
    </CustomModal>
  );
};

export default ${componentName};
`;

fs.mkdirSync(path.join(process.cwd(), modalPath), { recursive: true });
fs.writeFileSync(fullPath, template.trim());

console.log(`✅ modal "${componentName}" in path "${modalPath}" generated`);
