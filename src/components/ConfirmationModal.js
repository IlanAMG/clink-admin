import { Modale } from "./Modale";

export const ConfirmationModal = ({
  isOpen,
  close,
  title,
  content,
  onConfirmation,
}) => {
  return (
    <Modale
      isOpen={isOpen}
      close={close}
      title={title}
      content={content}
      actions={[
        {
          title: "Yes",
          click: () => {
            close();
            onConfirmation();
          },
        },
      ]}
    />
  );
};
