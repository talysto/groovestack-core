SELECT
  que_jobs.*
  , locks.id as lock_id
  , que_lockers.*
  , args->0->>'job_class' as sub_class
  
FROM public.que_jobs 
  
LEFT JOIN (
  SELECT 
    (classid::bigint << 32) + objid::bigint AS id, *
  FROM pg_locks
  WHERE locktype = 'advisory'
) locks USING (id)

LEFT JOIN public.que_lockers ON locks.pid = que_lockers.pid
