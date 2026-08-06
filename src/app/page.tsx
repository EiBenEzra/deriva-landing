import ReadingProgress from "@/components/ReadingProgress";
import EditorialNav from "@/components/EditorialNav";
import HeroSignalSystem from "@/components/HeroSignalSystem";
import BrokenInformationMap from "@/components/BrokenInformationMap";
import CostPromiseBottleneck from "@/components/CostPromiseBottleneck";
import SalesRoomExperience from "@/components/SalesRoomExperience";
import DemandQualificationMechanism from "@/components/DemandQualificationMechanism";
import OperationalScrollytelling from "@/components/OperationalScrollytelling";
import SignalGameMatrix from "@/components/SignalGameMatrix";
import VariableCostContract from "@/components/VariableCostContract";
import CRMTraceSystem from "@/components/CRMTraceSystem";
import MarketClarityScene from "@/components/MarketClarityScene";
import PilotValidationRoadmap from "@/components/PilotValidationRoadmap";
import FinalManifesto from "@/components/FinalManifesto";

export default function Page() {
  return (
    <>
      <ReadingProgress />
      <EditorialNav />
      <main>
        <section id="hero"><HeroSignalSystem /></section>
        <section id="mercado"><BrokenInformationMap /></section>
        <section id="dolor"><CostPromiseBottleneck /></section>
        <section id="sala"><SalesRoomExperience /></section>
        <section id="solucion"><DemandQualificationMechanism /></section>
        <section id="flujo"><OperationalScrollytelling /></section>
        <section id="teoria"><SignalGameMatrix /></section>
        <section id="modelo"><VariableCostContract /></section>
        <section id="crm"><CRMTraceSystem /></section>
        <section id="beneficios"><MarketClarityScene /></section>
        <section id="piloto"><PilotValidationRoadmap /></section>
        <section id="manifiesto"><FinalManifesto /></section>
      </main>
    </>
  );
}
