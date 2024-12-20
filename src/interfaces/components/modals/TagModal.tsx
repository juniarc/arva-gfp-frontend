import { customeTheme } from "@/interfaces/theme/customTheme";
import api from "@/services/api/api";
import { Tag } from "@/types/types";
import { Dialog, DialogBody, Input, Spinner } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { LuX } from "react-icons/lu";

const DynamicThemeProvider = dynamic(() => import("@material-tailwind/react").then((mod) => mod.ThemeProvider), { ssr: false });

interface TagModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  product_id: number;
  token: string | undefined;
  setNewTag: (newTag: Tag) => void;
  handleReqTagStatus: (status: "idle" | "loading" | "success" | "error") => void;
}

export default function TagModal({ isOpen, handleCloseModal, product_id, token, setNewTag, handleReqTagStatus }: TagModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  useEffect(() => {
    const getAllTags = async () => {
      const tags = await api.getAllTags();
      setAllTags(tags);
    };
    getAllTags();
  }, []);

  const [tag, setTag] = useState<string>("");

  const handleSubmit = async () => {
    setIsLoading(true);
    const existingTag = allTags.find((item) => item.tag_name.toLowerCase() === tag.toLowerCase());

    if (existingTag) {
      try {
        setNewTag(existingTag);
        await api.createProductTag(product_id, token, { tag_id: existingTag.tag_id });
        setIsLoading(false);
        handleReqTagStatus("success");
        setTimeout(() => {
          handleReqTagStatus("idle");
        }, 3000);
      } catch (error) {
        setIsLoading(false);

        handleReqTagStatus("error");
        setTimeout(() => {
          handleReqTagStatus("idle");
        }, 3000);
      }
    } else {
      try {
        const createTag = await api.createTag(token, { tag_name: tag.toLowerCase() });

        if (createTag.error) {
          alert(createTag.error);
        }

        const updatedTagList: Tag[] = await api.getAllTags();
        setAllTags(updatedTagList);

        const newTag = updatedTagList.find((item) => item.tag_name.toLowerCase() === tag.toLowerCase());

        if (newTag) {
          try {
            await api.createProductTag(product_id, token, { tag_id: newTag.tag_id });
            setNewTag(newTag);
            setIsLoading(false);
            handleReqTagStatus("success");
            setTimeout(() => {
              handleReqTagStatus("idle");
            }, 3000);
          } catch (error) {
            setIsLoading(false);

            handleReqTagStatus("error");
            setTimeout(() => {
              handleReqTagStatus("idle");
            }, 3000);
          }
        } else {
          throw new Error("Tag baru tidak ditemukan di daftar terbaru.");
        }
      } catch (error) {
        console.log(error);
        alert("error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isOpen) {
    return (
      <Dialog open={isOpen} handler={handleCloseModal} className="outline-none relative p-5 tablet:p-15 desktop:p-10">
        <button
          onClick={handleCloseModal}
          className="absolute top-5 right-5 tablet:w-15 tablet:h-15 tablet:top-15 tablet:right-15 desktop:w-15 desktop:h-15 desktop:top-15 desktop:right-15 tablet:p-3 z-10"
        >
          <LuX className="tablet:text-2xl desktop:text-2xl" />
        </button>
        <DialogBody className="text-black font-normal">
          <DynamicThemeProvider value={customeTheme}>
            <h3 className=" mb-10">Add Tag</h3>
            <div>
              <Input label="Tag" value={tag} onChange={(e) => setTag(e.target.value)} crossOrigin={undefined} className="tablet:text-base " />
              {isLoading ? (
                <div className="w-full py-3  flex items-center justify-center mt-10">
                  <Spinner color="green" />
                </div>
              ) : (
                <button type="button" onClick={handleSubmit} className="w-full bg-primary text-white rounded font-semibold py-3 mt-10">
                  Add Tag
                </button>
              )}
            </div>
          </DynamicThemeProvider>
        </DialogBody>
      </Dialog>
    );
  }
}
