// Core layout
export { FeedFlowRoot, type FeedFlowRootProps } from "./components/FeedFlowRoot";
export {
  MobileScrollContainer,
  type MobileScrollContainerProps,
} from "./components/MobileScrollContainer";
export {
  MobileFullSection,
  MOBILE_FULL_SECTION_CLASS,
  type MobileFullSectionProps,
  type MobileFullSectionTone,
} from "./components/MobileFullSection";
export {
  MobileStorySection,
  type MobileStorySectionProps,
  type MobileStoryAlign,
} from "./components/MobileStorySection";
export { MobileStickyCTA, type MobileStickyCTAProps } from "./components/MobileStickyCTA";
export { FeedFlowMotion, type FeedFlowMotionProps } from "./components/FeedFlowMotion";

// Narrative presets (PDF §4)
export { IntrigueSection, type IntrigueSectionProps } from "./sections/IntrigueSection";
export { ProblemSection, type ProblemSectionProps } from "./sections/ProblemSection";
export { SolutionSection, type SolutionSectionProps } from "./sections/SolutionSection";
export {
  CaseVisualsSection,
  type CaseVisualsSectionProps,
} from "./sections/CaseVisualsSection";
export {
  ProcessSection,
  type ProcessSectionProps,
  type ProcessStep,
} from "./sections/ProcessSection";
export {
  CredibilitySection,
  type CredibilitySectionProps,
  type CredibilityItem,
} from "./sections/CredibilitySection";
export { CTASection, type CTASectionProps } from "./sections/CTASection";

// Hooks
export { useReducedMotion } from "./hooks/useReducedMotion";
export { useFeedFlowViewport } from "./hooks/useFeedFlowViewport";
export { useLenis, type UseLenisOptions } from "./hooks/useLenis";

// Motion
export {
  fadeUpMotion,
  fadeUpReduced,
  headlineReveal,
  viewportOnce,
  viewportReelPanel,
  fadeUpInView,
} from "./motion/variants";
export { transition, transitionFast } from "./motion/transitions";

export { cn } from "./lib/cn";
