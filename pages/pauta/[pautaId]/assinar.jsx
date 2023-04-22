import { useRouter } from 'next/router';

export default function Assinar() {
  const router = useRouter();
  const { pautaId } = router.query; // retrieve the "pautaId" from the URL

  // fetch data for the specified "pautaId" here...

  return (
    <div>
      <h1>Assinar Pauta {pautaId}</h1>
      {/* display data for the specified "pautaId" here... */}
    </div>
  );
};