import { Section } from "@/components/component/section"
import { SectionMain } from "@/components/component/sectionMain"

export const Lecture = () => {
  return (
    <div className="flex h-full w-full justify-between gap-[76px] overflow-x-hidden bg-white pl-[67px] pt-[61px]">
      <Section></Section>
      <SectionMain></SectionMain>
    </div>
  )
}