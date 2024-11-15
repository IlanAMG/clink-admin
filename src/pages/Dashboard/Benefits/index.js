import { useEffect, useState } from "react";
import { CardWithTabs } from "../../../components/CardWithTabs";
import { GiftModal } from "./components/GiftModal";
import GiftsTable from "./components/GiftsTable";
import { fetchWhitelabelList } from "../../../store/Whitelabel/WhitelabelList/features";
import { whitelabelListSelector } from "../../../store/Whitelabel/WhitelabelList";
import { useDispatch, useSelector } from "react-redux";

export default function Benefits() {
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const { whiteLabelList: whitelabels } = useSelector(whitelabelListSelector);
  const dispatch = useDispatch();
  const tabs = [
    {
      name: "Gifts",
      component: (
        <GiftsTable
          setGiftModalOpen={setGiftModalOpen}
          setSelectedGift={setSelectedGift}
          whitelabels={whitelabels}
        />
      ),
      buttons: [
        {
          name: "Create a gift",
          action: () => setGiftModalOpen(true),
        },
      ],
    },
    {
      name: "Flash sales",
      component: null,
    },
  ];

  useEffect(() => {
    dispatch(fetchWhitelabelList());
  }, []);

  return (
    <>
      <GiftModal
        selectedGift={selectedGift}
        close={() => {
          setGiftModalOpen(false);
          setSelectedGift(null);
        }}
        isOpen={giftModalOpen}
        whitelabels={whitelabels}
      />
      <CardWithTabs
        setSelectedGift={setSelectedGift}
        name={"Benefits"}
        tabs={tabs}
      />
    </>
  );
}
