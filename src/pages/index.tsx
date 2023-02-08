import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../components/Button';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const getMarvelQuery = trpc.character.getCharacter.useQuery();

  const rateMarvelQuery = trpc.rate.rate.useMutation({
    onSuccess: () => getMarvelQuery.refetch()
  });

  if (!getMarvelQuery.data?.response) {
    return <div>Loading...</div>;
  }

  const character = getMarvelQuery.data.response;

  return (
    <section className='flex flex-col items-center justify-center'>
      <div className='mb-4'>
        <h1 className='text-xl font-bold'>Do you like them all ☄️ ?</h1>
      </div>
      <div className='flex flex-col gap-4 rounded-lg bg-slate-600 p-4'>
        <Link href={`/marvel/${character.id}`}>
          <div>
            <div className='flex items-center justify-between'>
              <h2 className='text-[24px] font-medium'>{character.name}</h2>
              <span>#{character.id}</span>
            </div>

            <div className='item-center mt-3 flex justify-center'>
              <Image
                alt={`pokemon ${character.name}`}
                src={character.image}
                width={300}
                height={300}
                className='animate-fade-in w-auto'
              />
            </div>
          </div>
        </Link>
        <div className='flex gap-3'>
          <Button
            onClick={() => rateMarvelQuery.mutate({ id: character?.id!, rate: 'like' })}
            disabled={rateMarvelQuery.isLoading}
          >
            LIKE
          </Button>
          <Button
            onClick={() => rateMarvelQuery.mutate({ id: character?.id!, rate: 'dislike' })}
            disabled={rateMarvelQuery.isLoading}
          >
            DISLIKE
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Home;
