import { DefaultButton } from "@fluentui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NavBarComponent } from "../../components";

export interface IHomePageProps {
    default_props?: boolean;
}

export const HomePage: React.FC<IHomePageProps> = () => {
    let navigate = useNavigate();

    return (
        <div className="homepage">
            <NavBarComponent />
            <div className="homebody">
                <div className="homebody__header">
                    <h1>La solution tout-en-un</h1>
                    <h2>Pour les professionnel de la formation</h2>
                    <h3>
                        Gestion administrative + E-learning + Qualité + Gestion
                        commerciale + Émargement numérique
                    </h3>
                    <span>Découvrez la vidéo de présentation :</span>
                    <DefaultButton
                        text="Inscription gratuite"
                        className="homedefaultbutton"
                        onClick={() => navigate("auth/signup")}
                    />
                    <p>Une imgae ici</p>
                </div>
                <p>
                    quo amet dolorem magnam? Porro assumenda maiores labore
                    rerum consectetur corrupti ab, voluptatem, ratione beatae
                    qui dolore cumque reiciendis iure eum. Eos, quibusdam
                    tempore? Qui voluptate minima, aut inventore, iure labore
                    velit dolorum corrupti, totam facilis deleniti! Quod quasi
                    fugiat eaque enim delectus quo pariatur accusamus quaerat
                    voluptas necessitatibus sapiente ratione magni molestias
                    possimus aspernatur, ex quae dolorem ullam reiciendis optio
                    esse deleniti recusandae! Modi doloribus corporis, deserunt
                    pariatur voluptatibus quis obcaecati repellat totam quae
                    laboriosam amet tenetur eligendi quibusdam! Cupiditate
                    voluptatibus possimus magni recusandae, autem consectetur!
                    Eius blanditiis incidunt fugit adipisci optio voluptate
                    recusandae voluptatibus, culpa debitis dignissimos ex eos
                    saepe aspernatur quod numquam ratione quos molestiae maiores
                    minus suscipit soluta facere tempore placeat? Dolorem, ipsa
                    eligendi! Aspernatur inventore in, vero officia rerum sunt,
                    deserunt illo mollitia omnis commodi laudantium voluptas
                    nemo laboriosam deleniti modi iste expedita quod fugiat
                    eligendi? Maiores quod voluptas maxime voluptatem ipsam amet
                    consectetur nobis sunt perferendis inventore alias debitis
                    eveniet id error deleniti eum nam optio ad, adipisci
                    laudantium quasi! Libero praesentium eveniet doloremque
                    cumque quas tempora labore? Iste commodi aut veniam, ab
                    similique aliquam eum itaque! Neque sequi, ducimus fuga
                    voluptatum autem iure assumenda? Voluptatem tempore minus
                    dolore et. Quam quas iste molestiae, veniam perspiciatis ut
                    necessitatibus distinctio id numquam aut eum nulla modi
                    magni voluptates quo, quae, dolores consectetur! Omnis
                    fugiat, dolores harum natus fuga labore ipsum possimus
                    nostrum odio quasi architecto animi dignissimos porro enim.
                    dolorem veritatis adipisci, non, sint et rem ea beatae modi
                    vel quidem laudantium minima similique aspernatur. Officiis
                    quia libero expedita nihil sequi ut error eum tempore a
                    quidem consectetur nesciunt quis deserunt asperiores
                    veritatis, praesentium animi, ea excepturi nulla provident!
                    Harum dolor at repellat dolorem vero error temporibus itaque
                    repudiandae laudantium consequuntur iste, hic aliquam
                    tempore dicta fugiat nam corrupti nihil earum reiciendis
                    ullam rerum ex, deserunt perspiciatis placeat. Error
                    distinctio inventore atque velit at facere? Cumque eaque
                    sequi dolore. Consequatur ratione architecto animi voluptate
                    nulla ullam magni dicta! Esse, omnis nisi deserunt minima
                    modi quae maxime doloremque voluptas unde saepe aut
                    laboriosam in sed aliquam accusamus adipisci error sunt
                    porro! Eaque voluptatem aut possimus tenetur reiciendis
                    necessitatibus voluptate excepturi adipisci ullam labore
                    soluta in, blanditiis quia fugit dolorem provident,
                    repellat, cupiditate facilis! Porro laborum, dicta quos
                    repudiandae accusantium quo reprehenderit nisi blanditiis
                    quae, necessitatibus dolore rem, reiciendis ex hic
                    voluptatibus ut. Ex culpa fugit et dignissimos dolorem
                    obcaecati, odit consectetur nemo, id quae illum ullam odio
                    praesentium numquam voluptas iste optio! Id dolore debitis
                    repudiandae dolores hic atque, sint vero nostrum laudantium,
                    consequuntur maiores quos! Esse delectus veritatis sapiente
                    facere molestias provident fugiat reprehenderit accusantium
                    eveniet itaque perspiciatis consequuntur labore voluptatem
                    dolorum cum, magni voluptate nihil vero doloremque mollitia.
                    Exercitationem, ea. Ullam itaque sunt ipsa nulla quaerat
                    reprehenderit vero, reiciendis minima sequi nostrum ea
                    tenetur similique iure fuga cupiditate voluptatem unde!
                    Doloremque sequi voluptatum atque illum dicta, omnis,
                    debitis nulla delectus quibusdam aliquid doloribus? Hic eius
                    qui laboriosam nisi enim tenetur, ipsa mollitia numquam
                    illum et, ullam obcaecati? Dolores sequi veritatis
                    perspiciatis possimus, odit impedit architecto quas earum,
                    reprehenderit provident explicabo voluptates dolor eligendi
                    nisi cumque aliquid laboriosam fuga nobis totam, assumenda
                    vitae debitis dignissimos autem! Rem similique vero
                    dignissimos ullam, tempora voluptates voluptatibus.
                    Possimus, voluptatem repellendus hic necessitatibus quia
                    molestias et animi natus aspernatur at expedita placeat
                    itaque libero corrupti, sequi magnam illo reprehenderit
                    incidunt est voluptate non harum voluptates assumenda
                    blanditiis. Rerum debitis ad reiciendis excepturi
                    repellendus labore, sapiente nobis veritatis nemo fuga
                    possimus incidunt natus temporibus, eveniet, doloremque
                    obcaecati? Tenetur facere molestias maxime eum, nihil
                    cumque. Reprehenderit, unde nesciunt. Obcaecati blanditiis
                    ullam impedit cupiditate voluptas deleniti, consequatur
                    dignissimos. Doloremque commodi rerum maxime officiis, qui
                    est maiores corrupti ad quibusdam vel earum doloribus ullam!
                    Officia vitae obcaecati dolores, a voluptates, rerum velit
                    perferendis accusamus ratione eaque, officiis voluptatum
                    nisi voluptas repellendus. Beatae, officiis animi.
                    Consequatur sed laboriosam cumque maiores aliquam quam
                    pariatur modi nesciunt debitis, ullam commodi mollitia,
                    beatae architecto numquam reiciendis veniam molestias
                    placeat cum repellat tempora necessitatibus officia ducimus
                    sit laudantium. Consequatur optio dolor deserunt quae illo
                    amet nesciunt rem voluptates provident similique, vero error
                    dolore eaque dolorum ipsum voluptatum saepe facere, ratione
                    soluta, accusantium porro enim earum! Nobis dolores
                    praesentium distinctio aspernatur libero corrupti hic harum
                    et reprehenderit? Explicabo atque iure optio, velit
                    repellat, ipsam eligendi eveniet dicta, molestias alias nisi
                    vero quo saepe voluptas dolores neque animi omnis cupiditate
                    earum quibusdam! Optio iure officia tempora. Maxime tenetur
                    adipisci enim. Harum repellat maiores perspiciatis nam animi
                    reiciendis facilis magnam sed vero tempore, ipsam
                    necessitatibus iste adipisci unde sequi, voluptas explicabo
                    optio mollitia deserunt? Modi pariatur sed aliquid,
                    praesentium amet similique aspernatur nesciunt quo non
                    accusantium recusandae beatae! Praesentium aperiam, at vitae
                    maiores cupiditate quas soluta voluptate quia est eum
                    commodi dolorem non hic amet enim. Molestias sint porro
                    suscipit harum ut odio quis ratione corporis commodi nobis
                    corrupti iste quae sed atque doloribus doloremque at
                    architecto, iusto cum soluta ipsa maiores placeat delectus
                    error. Ex voluptatibus adipisci minus recusandae atque eos,
                    maxime animi, suscipit dolorem optio eum dolores.
                </p>
            </div>
        </div>
    );
};
