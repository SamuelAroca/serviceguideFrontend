import styles from "../Styles/ServiceComparison.module.css";
import { BsWater, BsFillLightbulbFill, BsFillCloudFill } from "react-icons/bs";
import { FaToilet } from "react-icons/fa";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import { FormatDate, formatPrice } from "../../../Utilities";

// Antes esto (StatisticsHome.jsx) le pedia a
// /statistic/individualReceipt/BAR/{tipo}/{id} la comparacion del ultimo
// recibo, pero solo del tipo de servicio del ULTIMO recibo agregado (si
// fue de gas, nunca se veia la comparacion de agua aunque hubiera
// historial), y ese endpoint tira un 200 con cuerpo de error si no hay al
// menos 2 recibos de ese tipo -> las graficas quedaban vacias sin ningun
// aviso. Ademas eran graficas de barras completas (ejes, grilla, leyenda)
// para comparar 2 numeros nada mas.
//
// Esto en cambio arma la comparacion "antes -> ahora" para CADA tipo de
// servicio con al menos 2 recibos, calculado aca mismo a partir de la
// lista de recibos que Home.jsx ya pide (sin pegarle a ese endpoint), y
// la muestra como tarjetas simples en vez de graficas.
//
// receipts viene de /allReceiptsByUserId, es decir de TODAS las casas del
// usuario mezcladas. Agrupar solo por typeService comparaba el ultimo
// recibo de agua de la Casa 3 contra el anterior de la Casa 1 si ese fue
// el ultimo agregado -- una comparacion sin sentido con varias casas.
// Por eso se agrupa primero por casa y despues por tipo dentro de cada
// casa.

const TYPE_ORDER = ["WATER", "ENERGY", "GAS", "SEWERAGE"];

const TYPE_LABELS = {
  WATER: "Agua",
  ENERGY: "Energía",
  GAS: "Gas",
  SEWERAGE: "Alcantarillado",
};

const TYPE_ICONS = {
  WATER: BsWater,
  ENERGY: BsFillLightbulbFill,
  GAS: BsFillCloudFill,
  SEWERAGE: FaToilet,
};

const TYPE_UNIT = (type) => (type === "ENERGY" ? "kwh" : "m³");

const buildComparisons = (receipts) => {
  const byHouse = {};
  (receipts ?? []).forEach((r) => {
    const houseName = r.houseName ?? "Sin casa";
    const byType = (byHouse[houseName] ??= {});
    (byType[r.typeService] ??= []).push(r);
  });

  return Object.entries(byHouse)
    .map(([houseName, byType]) => ({
      houseName,
      services: TYPE_ORDER.filter((type) => byType[type]?.length).map((type) => {
        const [current, previous] = [...byType[type]].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        return { type, current, previous: previous ?? null };
      }),
    }))
    .filter((house) => house.services.length > 0)
    .sort((a, b) => a.houseName.localeCompare(b.houseName));
};

const Delta = ({ current, previous }) => {
  if (previous === undefined || previous === null) return null;
  const diff = current - previous;
  // Menos consumo/gasto es la buena noticia aca, no "mas" en abstracto.
  const isIncrease = diff > 0;
  const pct = previous !== 0 ? Math.abs((diff / previous) * 100) : null;

  if (diff === 0) {
    return <span className={styles.delta_flat}>Igual que antes</span>;
  }

  return (
    <span className={isIncrease ? styles.delta_up : styles.delta_down}>
      {isIncrease ? <BiTrendingUp /> : <BiTrendingDown />}
      {pct !== null ? `${pct.toFixed(0)}%` : ""}
    </span>
  );
};

const ServiceComparison = ({ receipts }) => {
  const houses = buildComparisons(receipts);

  if (houses.length === 0) {
    return (
      <div className={styles.empty_state}>
        <p>
          Todavía no hay suficientes recibos para comparar el consumo.
          Agrega al menos dos recibos del mismo servicio en una misma casa
          para ver la comparación acá.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.houses}>
      {houses.map(({ houseName, services }) => (
        <div className={styles.house_block} key={houseName}>
          <h4 className={styles.house_title}>{houseName}</h4>
          <div className={styles.grid}>
            {services.map(({ type, current, previous }) => {
              const Icon = TYPE_ICONS[type];
              return (
                <div className={styles.card} key={type}>
                  <div className={styles.card_header}>
                    <Icon className={styles.icon} />
                    <span>{TYPE_LABELS[type]}</span>
                  </div>

                  <div className={styles.stat_row}>
                    <div className={styles.stat}>
                      <span className={styles.stat_label}>Precio</span>
                      <span className={styles.stat_value}>
                        ${formatPrice(current.price)}
                      </span>
                    </div>
                    <Delta current={current.price} previous={previous?.price} />
                  </div>

                  <div className={styles.stat_row}>
                    <div className={styles.stat}>
                      <span className={styles.stat_label}>Consumo</span>
                      <span className={styles.stat_value}>
                        {formatPrice(current.amount)} {TYPE_UNIT(type)}
                      </span>
                    </div>
                    <Delta current={current.amount} previous={previous?.amount} />
                  </div>

                  {previous ? (
                    <p className={styles.compare_note}>
                      vs ${formatPrice(previous.price)} el{" "}
                      {FormatDate(previous.date)}
                    </p>
                  ) : (
                    <p className={styles.compare_note}>
                      Agrega otro recibo de {TYPE_LABELS[type]} para comparar.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceComparison;
