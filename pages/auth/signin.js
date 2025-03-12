"use client"
import {useEffect, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import Spinner from "@/components/Spinner";

export default function SignIn() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {data: session, status} = useSession();
    const router = useRouter();

    useEffect(() => {
        if(status === "authenticated") {
            router.push("/");
        }
    }, [status,router]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: form.email,
                password: form.password,
            });

            if (result?.error) {
                setError("Invalid credentials");
                setTimeout(() => {
                    setError("");
                }, 4000);
            } else {
                router.push("/");
            }
        } catch (e) {
            setError("Sign-in failed. Please try again later.");
            setTimeout(() => {
                setError("");
            }, 4000);
        } finally {
            setLoading(false);
        }
    };

    if (status ==='loading'  ) {
        return  <div className="flex flex-center wh_100">
            <Spinner/>
        </div>
    }
    return (
        <div className="flex flex-center full-h">
            <div className="loginform">
                <div className="heading">Signing In</div>
                {loading ? <div className="flex flex-center wh-100 flex-col"><Spinner/> Checking ......</div>  :
                   <>

                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        className="input"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                    {error && <p className="redcolor">{error}</p>}
                </form>
                       <span className="agreement">
                           <a target="_blank" href="/">Learn Admin Licence Agreement</a>
                       </span>
                   </>
                }
            </div>
        </div>
    );
}
