<template>
    <main class="fiche_montre">
        <myTitle>Modification de la Montre</myTitle>

        <div class="fiche_montre__rendu">
            <div class="fiche_montre__rendu--model">
                <sceneMontre v-bind="montrePreview"/>
            </div>

            <ul class="fiche_montre__rendu--infos fiche_montre__rendu--infos--pc">
                <li class="info info__nom">{{ montrePreview.nom }}</li>
                <li class="info">
                    Bracelet Texture (<span class="info__valeur">{{ montrePreview.bracelet_texture }}</span>) :
                    <span class="info__prix">{{ montrePreview.bracelet_texture_prix }} €</span>
                </li>
                <li class="info">
                    Cadran (<span class="info__valeur">{{ montrePreview.boitier_texture }}</span>) :
                    <span class="info__prix">{{ montrePreview.boitier_texture_prix }} €</span>
                </li>
                <li class="info">
                    Boitier Forme (<span class="info__valeur">{{ montrePreview.boitier_forme }}</span>) :
                    <span class="info__prix">{{ montrePreview.boitier_forme_prix }} €</span>
                </li>
                <li class="info">
                    Pierre (<span class="info__valeur">{{ montrePreview.pierre_nom }}</span>) :
                    <span class="info__prix">{{ montrePreview.pierre_prix }} €</span>
                </li>
                <li class="info">
                    Prix total : <span class="info__prix">{{ montrePreview.prix_montre }} €</span>
                </li>
                
                <li class="info info__bouton" v-if="store.token">
                    <myButton v-if="!isMontreInPanier && store.token" @click="ajouterPanier">Ajouter au Panier</myButton>
                    <myButton v-if="isMontreInPanier && store.token" @click="supprimerPanier">Supprimer du Panier</myButton>
                </li>

                <li class="info info__message">{{ message }}</li>
            </ul>
        </div>

        <form v-if="store.token && memeUser" @submit.prevent="modifierMontre" class="fiche_montre__form">
            <div class="fiche_montre__form--input">
                <label for="nom">Nom de la Montre</label>
                <input class="fiche_montre__form--in" type="text" name="nom" id="nom" v-model="montrePreview.nom">
            </div>
            
            <div class="fiche_montre__form--input">
                <label for="dernier_modifieur">Pseudo du créateur</label>
                <input class="fiche_montre__form--in" disabled type="text" name="dernier_modifieur" id="dernier_modifieur" v-model="montrePreview.createur">
            </div>
            
            <div class="fiche_montre__form--input">
                <label for="boitier_texture">Cadran</label>
                <select class="fiche_montre__form--select" name="boitier_texture" id="boitier_texture" v-model="montrePreview.boitier_texture">
                    <option v-for="b in boitier_texture" :key="b.id_boitier_texture" :value="b.nom" @click="updatePrice">{{ b.nom }}</option>
                </select>
            </div>
            
            <div class="fiche_montre__form--input">
                <label for="boitier_forme">Forme du Boitier</label>
                <select class="fiche_montre__form--select" name="boitier_forme" id="boitier_forme" v-model="montrePreview.boitier_forme">
                    <option v-for="b in boitier_forme" :key="b.id_boitier_forme" :value="b.nom" @click="updatePrice">{{ b.nom }}</option>
                </select>
            </div>
            
            <div class="fiche_montre__form--input">
                <label for="bracelet_texture">Texture du Bracelet</label>
                <select class="fiche_montre__form--select" name="bracelet_texture" id="bracelet_texture" v-model="montrePreview.bracelet_texture">
                    <option v-for="b in bracelet_texture" :key="b.id_bracelet_texture" :value="b.nom" @click="updatePrice">{{ b.nom }}</option>
                </select>
            </div>
            
            <div class="fiche_montre__form--input">
                <label for="pierre">Pierre Préciseuse</label>
                <select class="fiche_montre__form--select" name="pierre" id="pierre" v-model="montrePreview.pierre_couleur">
                    <option v-for="p in pierre" :key="p.id_pierre" :value="p.couleur" @click="updatePrice">{{ p.nom }}</option>
                </select>
            </div>
            
            <div class="fiche_montre__form--input">
                <label for="main_color">Couleur</label>
                <input type="color" name="main_color" id="main_color" v-model="montrePreview.main_color">
            </div>
            
            <div class="fiche_montre__form--input">
                <label for="fond_nom">Fond</label>
                <select class="fiche_montre__form--select" name="fond_nom" id="fond_nom" v-model="montrePreview.fond_nom">
                    <option v-for="f in fond" :key="f.id_fond" :value="f.nom">{{ f.nom }}</option>
                </select>
            </div>

            <div class="fiche_montre__form--boutons">
                <input v-if="memeUser" class="bouton" type="submit" value="Enregistrer les Modifications"/>
                <myButton v-if="store.token" class="bouton" color="black" @click="supp = true">Supprimer</myButton>
            </div>
        </form>
        
        <myButton v-if="store.token && !memeUser" class="fiche_montre__bouton" @click="modifierMontre()">Créer une copie à mon nom</myButton>

        <ul class="fiche_montre__rendu--infos fiche_montre__rendu--infos--phone">
            <li class="info info__nom">{{ montrePreview.nom }}</li>
            <li class="info">
                Bracelet Texture (<span class="info__valeur">{{ montrePreview.bracelet_texture }}</span>) :
                <span class="info__prix">{{ montrePreview.bracelet_texture_prix }} €</span>
            </li>
            <li class="info">
                Cadran (<span class="info__valeur">{{ montrePreview.boitier_texture }}</span>) :
                <span class="info__prix">{{ montrePreview.boitier_texture_prix }} €</span>
            </li>
            <li class="info">
                Boitier Forme (<span class="info__valeur">{{ montrePreview.boitier_forme }}</span>) :
                <span class="info__prix">{{ montrePreview.boitier_forme_prix }} €</span>
            </li>
            <li class="info">
                Pierre (<span class="info__valeur">{{ montrePreview.pierre_nom }}</span>) :
                <span class="info__prix">{{ montrePreview.pierre_prix }} €</span>
            </li>
            <li class="info">
                Prix total : <span class="info__prix">{{ montrePreview.prix_montre }} €</span>
            </li>
            
            <li class="info info__bouton" v-if="store.token">
                <myButton v-if="!isMontreInPanier && store.token" @click="ajouterPanier">Ajouter au Panier</myButton>
                <myButton v-if="isMontreInPanier && store.token" @click="supprimerPanier">Supprimer du Panier</myButton>
            </li>

            <li class="info info__message">{{ message }}</li>
        </ul>

        <div v-if="!store.token" class="fiche_montre__login">
            <p>Pour modifier cette montre ou l'ajouter à votre panier, veuillez vous connecter ou vous inscrire.</p>
            <div class="fiche_montre__login--bouton">
                <myButton lien="/login">Login</myButton>
            </div>
        </div>

        <div v-if="supp" class="fiche_montre__popup-supp">
            <p>Vous êtes sûr de vouloir supprimer cette montre&nbsp? Cette action est irréversible.</p>
            <p>Cette montre disparaitra de votre panier et de ceux des autres utilisateurs.</p>

            <myButton @click="supp = false">Non, je la laisse</myButton>
            <myButton color="black" @click="supprimerMontre">Oui, je veux la supprimer</myButton>
        </div>

    </main>
</template>

<style lang="scss">
.fiche_montre{
    padding-top: 5rem;
    overflow: hidden;

    &__rendu{
        display: flex;
        flex-wrap: wrap;
        gap: $m-litle;

        &--model{
            width: 100%;
        }

        &--infos{
            flex-direction: column;
            gap: $m-small;
            margin: auto;
            
            &--phone{
                display: flex;

                @include small{
                    display: none;
                }
            }

            &--pc{
                display: none;

                @include small{
                    display: flex;
                }
            }
            
            .info{

                &__valeur{
                    font-weight: $font-weight-medium;
                }

                &__prix{
                    color: $color-main;
                    font-weight: $font-weight-semibold;
                }

                &__nom{
                    font-size: $font-size-regular;
                    font-weight: $font_weight-bold;
                    margin-bottom: $m-small;
                }

                &__bouton{
                    margin: $m-small auto;
                }

                &__message{
                    margin: auto;
                    font-weight: $font_weight-bold;
                    color: $color-main;
                }
            }
        }
    }

    &__form{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: $m-litle;
        margin: $m-litle auto;
        max-width: $xl2;

        &--input{
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        &--in{
            width: 150px;
        }

        &--select{
            width: min-content;
        }

        &--boutons{
            width: 100%;

            .bouton{
                width: fit-content;
                margin: $m-litle auto;
            }
            
        }
    }

    &__bouton{
        width: fit-content;
        margin: $m-litle auto;
    }

    &__login{
        margin: $m-medium auto;
        text-align: center;

        &--bouton{
            width: fit-content;
            margin: auto;
            margin-top: $m-small
        }
    }

    &__popup-supp{
        position: fixed;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: $m-small;
        width: 700px;
        max-width: 100%;
        height: fit-content;
        min-height: 300px;
        padding: $m-litle;
        background: $color-white;
        border: 2px solid $color-main;
        border-radius: 10px;
        text-align: center;
    }

    @include small{
        &__rendu{

            &--model{
                width: 66%;
            }
        }
        
        &__form{
            
            &--in{
                width: 175px;
            }
        }
    }
}
</style>

<script setup>
import { API } from '@/utils/axios.js'

const store = useGlobalStore()

const route = useRoute()
const router = useRouter()
const montre = ref([])
const montrePreview = ref({})

const boitier_texture = ref([])
const boitier_forme = ref([])
const bracelet_texture = ref([])
const pierre = ref([])
const fond = ref([])

const users = ref([])
const user = ref([])
const actuelUser = ref([])
const memeUser = ref(false)

const message = ref("")
const supp = ref(false)

// récupérations des tables pour afficher la montre et tous les paramètres
const getMontre = async () => {
    const response = await API.get(`/montre/${route.params.id}`)
    montre.value = response.data[0]
    montrePreview.value = response.data[0]
}

const getBoitier_Texture = async () => {
    const response = await API.get(`/boitier_texure`)
    boitier_texture.value = response.data
}

const getBoitier_Forme = async () => {
    const response = await API.get(`/boitier_forme`)
    boitier_forme.value = response.data
}

const getBracelet_Texture = async () => {
    const response = await API.get(`/bracelet_texture`)
    bracelet_texture.value = response.data
}

const getPierre = async () => {
    const response = await API.get(`/pierre`)
    pierre.value = response.data
}

const getFond = async () => {
    const response = await API.get(`/fond`)
    fond.value = response.data
}

const getUser = async () => {
    const response = await API.get(`/user`)
    users.value = response.data
    user.value = users.value.find(u => u.pseudo === montre.value.createur)
    actuelUser.value = users.value.find(u => u.id_user === store.token)
    console.log("token", store.token, "user", user.value.id_user)
    memeUser.value = store.token == user.value.id_user ? true : false
}

// modification des prix en fonction des noms de chaque élément
const updatePrice = async () => {
    const BoitierTextureSelect = boitier_texture.value.find(bot => bot.nom === montre.value.boitier_texture )
    const BoitierFormeSelect = boitier_forme.value.find(bot => bot.nom === montre.value.boitier_forme )
    const BraceletTextureSelect = bracelet_texture.value.find(brt => brt.nom === montre.value.bracelet_texture )
    const PierreSelect = pierre.value.find(p => p.couleur === montre.value.pierre_couleur)

    montre.value.boitier_texture_prix = BoitierTextureSelect.prix
    montre.value.boitier_forme_prix = BoitierFormeSelect.prix
    montre.value.bracelet_texture_prix = BraceletTextureSelect.prix 
    montre.value.pierre_prix = PierreSelect.prix
    montre.value.pierre_nom = PierreSelect.nom

    montre.value.prix_montre = BoitierTextureSelect.prix + BoitierFormeSelect.prix + BraceletTextureSelect.prix + PierreSelect.prix
}

// enregistrement de la montre modifiée dans la base de données
const modifierMontre = async () => {
    try {
        if (memeUser.value){
            await API.put(`/montre/${route.params.id}/modif`, montrePreview.value);
            message.value = "Montre modifiée avec succès."
        } else {
            montre.value.createur = actuelUser.value.pseudo
            const reponse = await API.post(`/montre/add`, montre.value);
            
            if (reponse.data.message != "Cette montre existe déjà pour cet user"){
                message.value = "Montre créée avec succès."
                router.push(`/montre/${reponse.data.id_montre}`)
            } else {
                message.value = "Vous avez déjà copié cette montre !"
            }
        }
    } catch (error) {
        console.error("Erreur lors de la modification de la montre :", error.message)
        message.value = "Erreur lors de la modification de la montre."
    }
}

// suppression de la montre dans la base de données
const supprimerMontre = async () => {
    try {
        await API.delete(`/montre/${route.params.id}/supp/${store.token}`);
        message.value = "Montre supprimée avec succès.";
        router.push('/montre')
    } catch (error) {
        console.error("Erreur lors de la suppression de la montre :", error.message)
        message.value = "Erreur lors de la suppression de la montre."
    }
}

const panier = ref([])
const newPanier = ref({})

// récupérations du panier
const getPanier = async () => {
    const response = await API.get(`/user/${store.token}/panier`)
    panier.value = response.data
}

// fonction qui vérifie si la montre est dans le panier
const isMontreInPanier = computed(() => {
  if (montre.value && panier.value) {
    const montresInPanier = panier.value.map(item => item.id_montre)
    return montresInPanier.includes(montre.value.id_montre)
  }
  return false
})

// enregistrement de la montre dans le panier
const ajouterPanier = async () => {
    newPanier.value.id_montre = montre.value.id_montre
    newPanier.value.id_user = store.token

    try {
        await API.post(`/user/panier/add`, newPanier.value);
        message.value = "Montre mis dans le panier avec succès."
        // rappelle de la fonction pour mettre à jour le bouton
        getPanier()
    } catch (error) {
        console.error("Erreur lors de la mise dans le panier :", error.message)
        message.value = "Erreur lors de la mise dans le panier."
    }
}

// retire la montre du panier
const supprimerPanier = async () => {
    newPanier.value.id_montre = montre.value.id_montre
    newPanier.value.id_user = store.token

    try {
        await API.delete(`/user/panier/supp/${newPanier.value.id_user}/${newPanier.value.id_montre}`);
        message.value = "Montre retiré du panier avec succès."
        // rappelle de la fonction pour mettre à jour le bouton
        getPanier()
    } catch (error) {
        console.error("Erreur lors de la supprimession du panier :", error.message)
        message.value = "Erreur lors de la supprimession du panier."
    }
}

onMounted(async () => {
    await getMontre()
    await getBoitier_Texture()
    await getBoitier_Forme()
    await getBracelet_Texture()
    await getPierre()
    await getFond()
    await getUser()
    await getPanier()
})
</script>